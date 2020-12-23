const jwt = require("jsonwebtoken")

const router = require("express").Router()
const config = require("../config.js")

const Events = require("../events/events-model.js")

function getJwt(guest) {
  const payload = {
    guestId: guest.id,
    name: guest.name,
    eventId: guest.event_id,
  }

  const jwtOptions = {
    expiresIn: "8h",
  }

  return jwt.sign(payload, config.jwtSecret, jwtOptions)
}

router.post("/login", (req, res) => {
  const { inviteCode } = req.body

  if (inviteCode) {
    Events.findGuestByCode(inviteCode)
      .then((guest) => {
        if (guest.length > 0) {
          const token = getJwt(guest[0])

          res.status(200).json({ message: "Welcome to the GUEST Potluck Planner API", token })
        } else {
          res.status(401).json({ message: "Invalid credentials" })
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message })
      })
  } else {
    res.status(400).json({
      message: "please provide invite code",
    })
  }
})

module.exports = router
