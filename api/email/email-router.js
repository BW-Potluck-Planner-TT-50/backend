const router = require("express").Router()
const nodemailer = require("nodemailer")
const { tokenVerified } = require("../auth/restricted-middleware")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
})

const { getGuest, getAllGuests } = require("./email-model")

router.get("/all/:id", tokenVerified, async (req, res) => {
  try {
    const { id } = req.params
    const guests = await getAllGuests(id)
    guests.forEach((guest) => {
      const mailOptions = {
        from: "potluckplannerapp@gmail.com",
        to: guest.email,
        subject: "You have been invited to an event!",
        html: `<h1>Welcome ${guest.email.split("@")[0]}</h1><p>You have been invited to an event please <a href="https://plan-your-potluck.netlify.app/join-event">Click Here</a> and use<p><br><strong>Invite Code: ${guest.invite_code}</strong> to RSVP and select the food you will be bringing to the event`,
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
        } else {
          console.log(`Email sent: ${info.response}`)
        }
      })
    })
    res.status(200).json({ message: "Email sent to all guests" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/single/:id", tokenVerified, async (req, res) => {
  try {
    const { id } = req.params
    const [guest] = await getGuest(id)
    if (guest) {
      const mailOptions = {
        from: "potluckplannerapp@gmail.com",
        to: guest.email,
        subject: "You have been invited to an event!",
        html: `<h1>Welcome ${guest.email.split("@")[0]}</h1><p>You have been invited to an event please <a href="https://plan-your-potluck.netlify.app/join-event">Click Here</a> and use<p><br><strong>Invite Code: ${guest.invite_code}</strong> to RSVP and select the food you will be bringing to the event`,
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
        } else {
          console.log(`Email sent: ${info.response}`)
        }
      })
      res.status(200).json({ message: `Email sent to ${guest.email}` })
    } else {
      res.status(401).json({ message: "Cannot find any guest associated with this id" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
