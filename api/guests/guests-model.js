const db = require("../../database/connection.js")

function findById(guestId) {
  return db("guests").where({ id: guestId })
}

async function updateGuestInvite(guestId, food, rsvp) {
  try {
    await db("guests").where("id", guestId).update({
      rsvp, food,
    })
    return findById(guestId)
  } catch (error) {
    return error.message
  }
}

function findEvent(eventId) {
  return db("events").where({ id: eventId }).first()
}

module.exports = {
  findById,
  findEvent,
  updateGuestInvite,
}
