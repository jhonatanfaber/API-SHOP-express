const UserModel = require("./../../model")

module.exports = {
    updateCard
}

function updateCard(req, res) {
    let cardID = req.params.cardID
    let userID = req.params.userID

    UserModel.User.findOne({ id: userID })
        .then(user => {
            user.cards.forEach(element => {
                if (element.cardID == cardID) {
                    element.usdBuyPrice = req.body.usdBuyPrice
                }
            })
            user.save()
            return res.status(200).send(user);
        })
        .catch(() => {
            return res.sendStatus(400)
        })
}