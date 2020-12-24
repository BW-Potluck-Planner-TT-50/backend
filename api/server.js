const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const authRouter = require("./auth/auth-router.js")
const authGuestRouter = require("./auth-guest/auth-guest-router.js")
const eventsRouter = require("./events/events-router.js")
const guestsRouter = require("./guests/guests-router.js")
const emailRouter = require("./email/email-router")

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

server.use("/api/auth", authRouter)
server.use("/api/auth-guest", authGuestRouter)
server.use("/api/events", eventsRouter)
server.use("/api/guest", guestsRouter)
server.use("/api/email", emailRouter)

server.get("/", (req, res) => {
  res.status(200).json({ api: "Potluck Planner" })
})

module.exports = server
