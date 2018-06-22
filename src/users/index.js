const express = require('express')
const router = express.Router();
const all = require("./controller/getAllUsers")
const newUser = require("./controller/createNewUser");
const remove = require("./controller/deleteUser");


router.get("/", all.getAllUsers)
router.post("/", newUser.createNewUser)
router.delete("/:id",remove.deleteUser)

module.exports = router