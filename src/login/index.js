var express = require('express');
var router = express.Router();
user = require("./controller.js");

router.post("/", user.signIn);

module.exports = router;
