const express = require('express');
const router = express.Router();
const user = require("./controller.js");

router.post("/", user.signup);

module.exports = router;
