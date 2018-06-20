const express = require('express');
const router = express.Router();
const user = require("./controller.js");

router.post("/", user.signIn);

module.exports = router;
