const shortid = require("shortid")
const db = require("../../database/connection.js")

function findByUserId(userId) {
  return db("events").where({ user_id: userId })
}

function findById(id) {
  return db("events").where({ id }).first()
}

async function add(event) {
  try {
    const [id] = await db("events").insert(event)
    return findById(id)
  } catch (error) {
    return error.message
  }
}

function remove(id, userId) {
  // we ask for the user id here to make sure users can only delete their own
  // events. this way people can't just delete anyone else's event
  return db("events").where({ id, user_id: userId }).del()
}

async function update(id, userId, changes) {
  try {
    await db("events").where({ id, user_id: userId }).update(changes)
    return findById(id)
  } catch (error) {
    return error.message
  }
}

function findGuests(eventId) {
  return db("guests").where("event_id", eventId)
}

async function findGuestByCode(inviteCode) {
  try {
    return db("guests").where("invite_code", inviteCode)
  } catch (error) {
    return error.message
  }
}

function findGuestById(id) {
  return db("guests").where({ id })
}

function removeGuest(id) {
  return db("guests").where({ id }).del()
}

async function addGuest(guest) {
  try {
    const theGuest = guest
    theGuest.invite_code = shortid.generate()
    const [id] = await db("guests").insert(theGuest)
    return db("guests").where({ id })
  } catch (error) {
    return error.message
  }
}

module.exports = {
  findByUserId,
  findById,
  add,
  remove,
  update,
  findGuests,
  findGuestById,
  findGuestByCode,
  addGuest,
  removeGuest,
}
