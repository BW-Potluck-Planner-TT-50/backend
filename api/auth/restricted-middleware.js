const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config.js")
const { checkIfEmailExists } = require("./auth-model")

const validRegistration = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.status(401).json({ message: "Request must include username, email, and password" })
    } else {
      const email = await checkIfEmailExists(req.body.email)
      if (email.length > 0) {
        res.status(401).json({ message: "This email already has an account associated with it" })
      } else {
        next()
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const validLogin = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: "Request must include email, and password" })
  } else {
    const email = await checkIfEmailExists(req.body.email)
    if (email.length === 0) {
      res.status(401).json({ message: "There is no account associated with this email" })
    } else {
      next()
    }
  }
}

const tokenVerified = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // token is invalid
        res.status(401).json({ you: "Limited Access" })
      } else {
        // token is valid
        req.jwt = decodedToken

        next()
      }
    })
  } else {
    res.status(401).json({ you: "Access Denied" })
  }
}

const validateEvent = (req, res, next) => {
  if (req.body.name && req.body.date && req.body.time && req.body.location) {
    next()
  } else {
    res.status(400).json({ message: "Please provide a name for the event." })
  }
}

module.exports = {
  validRegistration,
  validLogin,
  tokenVerified,
  validateEvent,
}
