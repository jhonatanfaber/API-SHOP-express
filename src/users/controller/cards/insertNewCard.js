const UserModel = require("./../../model")

module.exports = {
    insertNewCard
}

function insertNewCard(req, res) {
    let newCard = new UserModel.Card({
        coinID: req.body.coinID,
        cardID: req.body.cardID,
        amount: req.body.amount,
        boughtDate: req.body.boughtDate,
        usdBuyPrice: req.body.usdBuyPrice,
        logo: req.body.logo,
        name: req.body.name,
        symbol: req.body.symbol,
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


