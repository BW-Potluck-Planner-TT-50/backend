const express = require("express");
const Guests = require("./guests-model.js");
const restricted = require("../auth-guest/restricted-middleware");

const router = express.Router();

router.use(restricted);

router.get("/guest", (req, res) => {
  Guests.findById(req.jwt.guestId)
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving guest data.",
      });
    });
});

// update guest info
router.put("/guest", (req, res) => {
  if (!req.body.foodId || req.body.rsvp === undefined) {
    return res.status(400).json({ message: "Please select a food and RSVP" })
  }

  console.log("guestid", req.jwt.guestId)
  console.log("foodid", req.body.foodId)
  console.log("rsvp", req.body.rsvp)
  Guests.updateGuestInvite(req.jwt.guestId, req.body.foodId, req.body.rsvp)
    .then((guest) => {
      if (guest) {
        res.status(200).json(guest);
      } else {
        res.status(404).json({ message: "The guest could not be found" });
      }
    })
    .catch((error) => {
      console.log("ERROR", error);
      console.log("ERROR", error);
      res.status(500).json({
        message: "Error updating guest's information.",
      });
    });
});


// Render food to page
router.get("/guest/food", (req, res) => {
  Guests.findAllEventFood(req.jwt.eventId)
    .then((food) => {
      if (food) {
        return res.status(200).json(food);
      } else {
        res.status(404).json({ message: "Food not found" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log("ERROR", error);
      res.status(500).json({
        message: "Error retrieving the food",
      });
    });
});

// Render event to page
router.get("/guest/event", (req, res) => {
  Guests.findEvent(req.jwt.eventId)
    .then((event) => {
      if (event) {
        // make sure this event belongs to the signed-in user
        if (event.id !== req.jwt.eventId) {
          return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log("ERROR", error);
      res.status(500).json({
        message: "Error retrieving the event",
      });
    });
});




module.exports = router;
