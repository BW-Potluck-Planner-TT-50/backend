const express = require("express");
const Events = require("./events-model.js");
const restricted = require("../auth/restricted-middleware");

const router = express.Router();

router.use(restricted);

// get all events that belong to the signed-in user
router.get("/events", (req, res) => {
  Events.findByUserId(req.jwt.userId)
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving user's events",
      });
    });
});

// get an event by id
router.get("/events/:id", (req, res) => {
  Events.findById(req.params.id)
    .then((event) => {
      if (event) {
        // make sure this event belongs to the signed-in user
        if (event.user_id !== req.jwt.userId) {
          res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the event",
      });
    });
});

function validateEvent(req, res, next) {
  if (req.body.name && req.body.date && req.body.time && req.body.location) {
    next();
  } else {
    res.status(400).json({ message: "Please provide a name for the event." });
  }
}

// add a new event
router.post("/events", validateEvent, (req, res) => {
  Events.add({
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    user_id: req.jwt.userId,
  })
    .then((event) => {
      res.status(201).json(event);
    })
    .catch((error) => {
      // log error to server
      console.log("ERROR", error);
      res.status(500).json({
        message: "Error adding the event",
      });
    });
});

// update an event by id
router.put("/events/:id", validateEvent, (req, res) => {
  Events.update(req.params.id, req.jwt.userId, req.body)
    .then((event) => {
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: "The event could not be found" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error updating the event",
      });
    });
});

// delete an event by id
router.delete("/events/:id", (req, res) => {
  Events.remove(req.params.id, req.jwt.userId)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The event has been deleted" });
      } else {
        res.status(404).json({ message: "The event could not be found" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error removing the event",
      });
    });
});

// get all food that belongs to an event
router.get("/events/:id/food", (req, res) => {
  Events.findFood(req.params.id)
    .then((eventFood) => {
      res.status(200).json(eventFood);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error getting event food",
      });
    });
});

// get food by id
router.get("/events/food/:id", (req, res) => {
  Events.findFoodById(req.params.id)
    .then((eventFood) => {
      res.status(200).json(eventFood);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error getting event food",
      });
    });
});

// add a new food to an event
router.post("/events/:id/food", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please provide a name for the food." });
    return;
  }

  Events.addFood({
    name: req.body.name,
    event_id: req.params.id,
  })
    .then((eventFood) => {
      res.status(200).json(eventFood);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error adding food to the event",
      });
    });
});

// delete food by id
router.delete("/events/food/:id", (req, res) => {
  Events.removeFood(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The food has been deleted" });
      } else {
        res.status(404).json({ message: "The food could not be found" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error removing the food",
      });
    });
});

// get all guests that belong to an event
router.get("/events/:id/guests", (req, res) => {
  Events.findGuests(req.params.id)
    .then((guests) => {
      res.status(200).json(guests);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error getting event guests",
      });
    });
});

// get guest by id
router.get("/events/guest/:id", (req, res) => {
  Events.findGuestById(req.params.id)
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error getting event guest",
      });
    });
});

// add a new guest to an event
router.post("/events/:id/guest", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please provide a name for the guest." });
    return;
  }

  Events.addGuest({
    name: req.body.name,
    event_id: req.params.id,
  })
    .then((guest) => {
      res.status(200).json(guest);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error adding guest to the event",
      });
    });
});

// delete guest by id
router.delete("/events/guest/:id", (req, res) => {
  Events.removeGuest(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The guest has been deleted" });
      } else {
        res.status(404).json({ message: "The guest could not be found" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log("ERROR", error);
      res.status(500).json({
        message: "Error removing the guest",
      });
    });
});

module.exports = router;
