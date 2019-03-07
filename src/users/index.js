const express = require('express')
const router = express.Router();
const all = require("./controller/getAllUsers")
const newUser = require("./controller/createNewUser");
const update = require("./controller/updateUser");
const status = require("./controller/updatePartiallyUserData")
const remove = require("./controller/deleteUser");

const newCard = require("./controller/cards/insertNewCard")
const removeCard = require("./controller/cards/deleteCard")
const card = require("./controller/cards/getCards")

const adminAuthentication = require("./../auth/adminAuthentication.js")



router.put("/:id", update.updateUser)
router.patch("/:id", status.updatePartiallyUserData)

router.get("/:id/cards", card.getCards)
router.post("/:id/card", newCard.insertNewCard)
router.delete("/:userID/card/:cardID",removeCard.deleteCard)

router.use(adminAuthentication)
router.get("/", all.getAllUsers)
router.post("/", newUser.createNewUser)
router.delete("/:id",remove.deleteUser)

module.exports = router 