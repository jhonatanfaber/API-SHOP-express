const UserModel = require("./../../model")

module.exports = {
    getCards
}

function getCards(req, res) {
    const userID = req.params.id
    UserModel.User.findOne({ id: userID })
        .then(user => {
            if (user.cards) return res.status(200).send(user.cards)
            return res.status(404).json({ Message: "No valid user ID" })
        })
        .catch(() => {
            return res.sendStatus(400)
        })
}


