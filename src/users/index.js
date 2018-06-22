const express = require('express')
const router = express.Router();
const all = require("./controller/getAllUsers")
const newUser = require("./controller/createNewUser");


router.get("/", all.getAllUsers)
router.post("/", newUser.createNewUser)

module.exports = router