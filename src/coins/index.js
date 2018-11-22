const express = require('express')
const router = express.Router();
const coin = require("./controller")

router.get("/", coin.getCoins)

module.exports = router