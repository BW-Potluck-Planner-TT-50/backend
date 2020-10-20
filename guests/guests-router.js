const express = require("express");
const Events = require("./events-model.js");
const restricted = require("../auth-guest/restricted-middleware");

const router = express.Router();

router.use(restricted);

module.exports = router;
