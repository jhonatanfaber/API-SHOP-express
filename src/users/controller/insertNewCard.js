const UserModel = require("../model")

module.exports = {
    insertNewCard
}

function insertNewCard(req, res) {
    let id = req.params.id
    let newCard = new UserModel.Card({
        cardID: req.body.cardID,
        amount: req.body.amount,
        boughtDate: req.body.boughtDate,
        coinID: req.body.coinID,
        usdBuyPrice: req.body.usdBuyPrice,
    })

    UserModel.User.findOne({ id: req.params.id })
        .then(user => {
            user.cards.push(newCard)
            user.save()
            return res.status(200).send(user)
        })
        .catch(() => {
            return res.sendStatus(400)
        })
}


