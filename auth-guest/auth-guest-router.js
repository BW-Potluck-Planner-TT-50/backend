const jwt = require("jsonwebtoken");

const router = require("express").Router();
const config = require("../api/config.js");

const Events = require("../events/events-model.js");

router.post("/login", (req, res) => {
    const { name, invite_code } = req.body;

    if (name && invite_code) {
        Events.findGuestByNameAndCode(name, invite_code)
            .then((guest) => {
                if (guest) {
                    const token = getJwt(guest);

                    res.status(200).json({ message: "Welcome to the GUEST Potluck Planner API", token });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide guest name and invite code",
        });
    }
});

function getJwt(guest) {
    const payload = {
        guestId: guest.id,
        name: guest.name,
    };

    const jwtOptions = {
        expiresIn: "8h",
    };

    return jwt.sign(payload, config.jwtSecret, jwtOptions);
}

module.exports = router;