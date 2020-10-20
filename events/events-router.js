const express = require("express");
const Events = require("./events-model.js");
const restricted = require("../auth/restricted-middleware")

const router = express.Router();

// this only runs if the url has /api/events/:id in it
router.get("/events/:id", (req, res) => {
  Events.findByUserId(req.query)
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

// /api/event/:id

router.get("/event/:id", (req, res) => {
  Events.findById(req.params.id)
    .then((event) => {
      if (event) {
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

function validatePost(req, res, next) {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ message: "Please provide a name for the event." });
  }
};


router.post("/events", restricted, validatePost, (req, res) => {

  Events.add(req.body)
    .then((event) => {
      res.status(201).json(event);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error adding the event",
      });
    });
});

router.delete("/:id", (req, res) => {
  Hubs.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The hub has been nuked" });
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error removing the hub",
      });
    });
});

router.put("/:id", (req, res) => {
  Hubs.update(req.params.id, req.body)
    .then((hub) => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error updating the hub",
      });
    });
});

// add an endpoint that returns all the messages for a hub
// this is a sub-route or sub-resource
router.get("/:id/messages", (req, res) => {
  Hubs.findHubMessages(req.params.id)
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error getting the messages for the hub",
      });
    });
});

// add an endpoint for adding new message to a hub
router.post("/:id/messages", (req, res) => {
  const messageInfo = { ...req.body, hub_id: req.params.id };

  Messages.add(messageInfo)
    .then((message) => {
      res.status(210).json(message);
    })
    .catch((error) => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error getting the messages for the hub",
      });
    });
});

module.exports = router;