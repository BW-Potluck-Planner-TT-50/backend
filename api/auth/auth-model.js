const db = require("../../database/connection")

function checkIfEmailExists(email) {
  return db("users").where({ email })
}

function findBy(filter) {
  return db("users as u")
    .where(filter)
    .select("u.id", "u.username", "u.password")
    .orderBy("u.id")
}

function findById(id) {
  return db("users").where({ id }).first()
}

async function add(user) {
  const [id] = await db("users").insert(user)
  return findById(id)
}

module.exports = {
  add,
  findBy,
  findById,
  checkIfEmailExists,
}