const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = require("express").Router()
const config = require("../config.js")
const Users = require("./auth-model.js")
const { validLogin, validRegistration } = require("./restricted-middleware")

function getJwt(user) {
  const payload = {
    userId: user.id,
    username: user.email,
  }

  const jwtOptions = {
    expiresIn: "8h",
  }

  return jwt.sign(payload, config.jwtSecret, jwtOptions)
}

router.post("/register", validRegistration, (req, res) => {
  const credentials = req.body
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcryptjs.hashSync(credentials.password, rounds)
  credentials.password = hash
  Users.add(credentials)
    .then((user) => {
      res.status(201).json({ data: user })
    })
    .catch((error) => {
      res.status(500).json({ message: error.message })
    })
})

router.post("/login", validLogin, (req, res) => {
  const { email, password } = req.body
  Users.findBy({ email })
    .then(([user]) => {
      // compare the password the hash stored in the database
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = getJwt(user)
        res.status(200).json({ message: "Welcome to the Potluck Planner API", token })
      } else {
        res.status(401).json({ message: "Invalid credentials" })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message })
    })
})

module.exports = router
