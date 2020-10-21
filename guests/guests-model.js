const db = require("../database/connection.js");

module.exports = {
  findById,
  findEvent,
  findEventFood,
  update
};

function findById(guestId) {
  return db("guests").where({ id: guestId });
}

async function updateGuestInvite(guestId, foodId, rsvp) {
  await db("guests").where("id", guestId).update({
    rsvp
  });

  await db("food").where("id", foodId).update({
    guest_id: guestId
  });

  return findById(guestId);
}

function findEvent(eventId) {
  return db("events").where({ id: eventId }).first();
}

function findAllEventFood(eventId) {
  return db("food").where({ id: eventId });
}

