const db = require("../../database/connection")

function getGuest(id) {
  return db("guests").where({ id })
}

function getAllGuests(eventId) {
  return db("guests").where({ event_id: eventId })
}

module.exports = {
  getGuest,
  getAllGuests,
}
