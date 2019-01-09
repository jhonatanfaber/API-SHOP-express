const UserModel = require("../model")

module.exports = {
    updatePartiallyUserData
}

function updatePartiallyUserData(req, res) {
    let id = req.params.id
    // let newCard = new UserModel.Card({
    //     cardID: req.body.cardID,
    //     amount: req.body.amount,
    //     boughtDate: req.body.boughtDate,
    //     coinID: req.body.coinID,
    //     usdBuyPrice: req.body.usdBuyPrice,
    // })
    UserModel.User.update({ id }, { $set: req.body },{ upsert: true })
        .then(() => {
            return res.sendStatus(204)
        })
        .catch(() => {
            res.sendStatus(400)
        })
}


