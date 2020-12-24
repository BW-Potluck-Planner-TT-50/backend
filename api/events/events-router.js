const express = require("express")
const Events = require("./events-model.js")
const { tokenVerified, validateEvent } = require("../auth/restricted-middleware")

const router = express.Router()

// get all events that belong to the signed-in user
router.get("/", tokenVerified, (req, res) => {
  Events.findByUserId(req.jwt.userId)
    .then((events) => {
      res.status(200).json(events)
    })
    .catch((error) => {
      // log error to server
      console.log(error)
      res.status(500).json({
        message: "Error retrieving user's events",
      })
    })
})

// get an event by id
router.get("/:id", tokenVerified, (req, res) => {
  Events.findById(req.params.id)
    .then((event) => {
      if (event) {
        // make sure this event belongs to the signed-in user
        res.status(200).json(event)
      } else {
        res.status(404).json({ message: "Event not found" })
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error)
      res.status(500).json({
        message: "Error retrieving the event",
      })
    })
})

// add a new event
router.post("/", tokenVerified, validateEvent, (req, res) => {
  Events.add({
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    user_id: req.jwt.userId,
  })
    .then((event) => {
      res.status(201).json(event)
    })
    .catch((error) => {
      // log error to server
      console.log("ERROR", error)
      res.status(500).json({
        message: "Error adding the event",
      })
    })
})

// update an event by id
router.put("/:id", tokenVerified, (req, res) => {
  Events.update(req.params.id, req.jwt.userId, req.body)
    .then((event) => {
      if (event) {
        res.status(200).json(event)
      } else {
        res.status(404).json({ message: "The event could not be found" })
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error)
      res.status(500).json({
        message: "Error updating the event",
      })
    })
})

// delete an event by id
router.delete("/:id", tokenVerified, (req, res) => {
  Events.remove(req.params.id, req.jwt.userId)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The event has been deleted" })
      } else {
        res.status(404).json({ message: "The event could not be found" })
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error)
      res.status(500).json({
        message: "Error removing the event",
      })
    })
})

// get all guests that belong to an event
router.get("/:id/guest-list", tokenVerified, (req, res) => {
  Events.findGuests(req.params.id)
    .then((guests) => {
      res.status(200).json(guests)
    })
    .catch((error) => {
      // log error to server
      console.log(error)
      res.status(500).json({
        message: "Error getting event guests",
      })
    })
})

// add a new guest to an event
router.post("/:id/guest-list", tokenVerified, (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ message: "Please provide a name for the guest." })
  }
  Events.addGuest({
    email: req.body.email,
    event_id: req.params.id,
  })
    .then((guest) => {
      res.status(200).json(guest)
    })
    .catch((error) => {
      // log error to server
      console.log(error)
      res.status(500).json({
        message: "Error adding guest to the event",
      })
    })
})

// delete guest by id
router.delete("/guest-list/:id", tokenVerified, (req, res) => {
  Events.removeGuest(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The guest has been deleted" })
      } else {
        res.status(404).json({ message: "The guest could not be found" })
      }
    })
    .catch((error) => {
      // log error to server
      console.log("ERROR", error)
      res.status(500).json({
        message: "Error removing the guest",
      })
    })
})

module.exports = router
