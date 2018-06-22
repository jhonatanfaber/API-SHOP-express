const express = require('express')
const router = express.Router();
const all = require("./controller/getAllUsers")
const newUser = require("./controller/createNewUser");
const update = require("./controller/updateUser");
const status = require("./controller/updateAdminStatus")
const remove = require("./controller/deleteUser");


router.get("/", all.getAllUsers)
router.post("/", newUser.createNewUser)
router.put("/:id", update.updateUser)
router.patch("/:id", status.updateAdminStatus)
router.delete("/:id",remove.deleteUser)

module.exports = router