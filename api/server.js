const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router.js");
const authGuestRouter = require("../auth-guest/auth-guest-router.js");
const usersRouter = require("../users/users-router.js");
const eventsRouter = require("../events/events-router.js");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/auth-guest", authGuestRouter);
server.use("/api/users", usersRouter);
server.use("/api", eventsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "Potluck Planner" });
});

module.exports = server;