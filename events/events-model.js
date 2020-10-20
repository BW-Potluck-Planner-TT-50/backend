const db = require("../database/connection.js");

module.exports = {
  findByUserId,
  findById,
  add,
  remove,
  update,
  findEventFood,
  findEventFoodById,
  addFood,
  removeEventFood,
  updateFood,
  findGuests,
  findGuestById,
  addGuest,
  removeGuest,
  updateGuest,
};

function findByUserId(events, userId) {
  return db("events").where(user.id);
}

function findById(id) {
  return db("events").where({ id }).first();
}

async function add(event) {
  const [id] = await db("events").insert(event);

  return findById(id);
}

function remove(id) {
  return db("events").where({ id }).del();
}

function update(id, changes) {
  return db("events").where({ id }).update(changes, "*");
}

function findEventFood(eventId) {
  return db("food as f")
    .join("events as e", "f.event_id", "e.id")
    .select("f.*")
    .where("e.id", eventId);
}

function findEventFoodById(id) {
  return db("eventFood").where({ id }).first();
}

async function addFood(food) {
  const [id] = await db("food").insert(food);

  return findEventFoodById(id);
}

function removeEventFood(id) {
  return db("eventFood").where({ id }).del();
}

function updateFood(id, changes) {
  return db("food").where({ id }).update(changes, "*");
}

function findGuests(eventId) {
  return db("guests").where("events as e", "e.id", eventId);
}

function findGuestById(id) {
  return db("guests").where({ id }).first();
}

function removeGuest(id) {
  return db("guests").where({ id }).del();
}

async function addGuest(guest) {
  const [id] = await db("guests").insert(guest);

  return findGuestById(id);
}

function updateGuest(id, changes) {
  return db("guests").where({ id }).update(changes, "*");
}
