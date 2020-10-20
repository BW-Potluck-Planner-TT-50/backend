const shortid = require("shortid");
const db = require("../database/connection.js");

module.exports = {
  findByUserId,
  findById,
  add,
  remove,
  update,
  findFood,
  findFoodById,
  addFood,
  removeFood,
  findGuests,
  findGuestById,
  findGuestByNameAndCode,
  addGuest,
  removeGuest,
};

function findByUserId(userId) {
  return db("events").where({ user_id: userId });
}

function findById(id) {
  return db("events").where({ id }).first();
}

async function add(event) {
  const [id] = await db("events").insert({
    ...event,
    invite_code: shortid.generate(),
  }, "id");

  return findById(id);
}

function remove(id, userId) {
  // we ask for the user id here to make sure users can only delete their own
  // events. this way people can't just delete anyone else's event
  return db("events").where({ id, user_id: userId }).del();
}

async function update(id, userId, changes) {
  await db("events").where({ id, user_id: userId }).update(changes);

  return findById(id);
}

function findFood(eventId) {
  return db("food").where("event_id", eventId);
}

function findFoodById(id) {
    return db("food").where({ id }).first();
  }
  
async function addFood(food) {
  // find out if the food exists
  const foodExists = await db("food")
    .where("name", food.name)
    .where("event_id", food.event_id)
    .first();

  if (foodExists) {
    return foodExists;
  }
  const [id] = await db("food").insert(food, "id");

  return await db("food").where({ id }).first();
}

function removeFood(id) {
  return db("food").where({ id }).del();
}

function findGuests(eventId) {
  return db("guests").where("event_id", eventId);
}

async function findGuestByNameAndCode(name, inviteCode) {
  const event = await db("events").where("invite_code", inviteCode).first();

  if (!event) {
    return null;
  }

  return db("guests").where("event_id", event.id).where("name", name).first();
}

function findGuestById(id) {
  return db("guests").where({ id }).first();
}

function removeGuest(id) {
  return db("guests").where({ id }).del();
}

async function addGuest(guest) {
  const [id] = await db("guests").insert(guest, "id");

  return findGuestById(id);
}
