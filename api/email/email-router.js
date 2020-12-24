const router = require("express").Router()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
})

const { getGuest, getAllGuests } = require("./email-model")

router.get("/all/:id", async (req, res) => {
  const { id } = req.params
  const guests = await getAllGuests(id)
  guests.forEach((guest) => {
    const mailOptions = {
      from: "potluckplannerapp@gmail.com",
      to: guest.email,
      subject: "You have been invited to an event!",
      html: `<h1>Welcome</h1><p>You have been invited to an event please go to <a href="potluckplanner.com/guest-invite">potluckplanner.com</a> and use<p><br><strong>Invite Code: ${guest.invite_code}</strong>`,
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
})

router.get("/single/:id", async (req, res) => {
  const { id } = req.params
  const [guest] = await getGuest(id)
  if (guest) {
    const mailOptions = {
      from: "potluckplannerapp@gmail.com",
      to: guest.email,
      subject: "You have been invited to an event!",
      html: `<h1>Welcome</h1><p>You have been invited to an event please go to <a href="potluckplanner.com/guest-invite">potluckplanner.com</a> and use<p><br><strong>Invite Code: ${guest.invite_code}</strong>`,
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
})

module.exports = router