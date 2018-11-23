const express = require('express')
const router = express.Router();
const all = require("./controller/getAllUsers")
const newUser = require("./controller/createNewUser");
const update = require("./controller/updateUser");
const status = require("./controller/updatePartiallyUserData")
const remove = require("./controller/deleteUser");

const newCard = require("./controller/insertNewCard")
const removeCard = require("./controller/deleteCard")



router.get("/", all.getAllUsers)
router.post("/", newUser.createNewUser)
router.put("/:id", update.updateUser)
router.patch("/:id", status.updatePartiallyUserData)
router.delete("/:id",remove.deleteUser)

router.post("/:id/card", newCard.insertNewCard)
router.delete("/:userID/card/:cardID",removeCard.deleteCard)

module.exports = router 