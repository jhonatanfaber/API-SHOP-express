const express = require('express');
const router = express.Router();
const user = require("./controller.js");

router.put("/reset_password", user.resetPassword);
router.post("/forgot_password", user.forgotPassword);

module.exports = router;
