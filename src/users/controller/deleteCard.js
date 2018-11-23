const UserModel = require("./../model")

module.exports = {
    deleteCard
}

function deleteCard(req, res) {
    let cardID = req.params.cardID;
    let userID = req.params.userID;
    
    UserModel.User.findOne({ id: userID })
        .then(user => {
            // TO FIX: index no es el correcto
            let index = user.cards.findIndex(card => card.cardId == cardID)
            console.log(index);
            
            // user.cards.splice(index, 1)
            // user.save()
            // return res.sendStatus(204);
        })
        .catch(() => {
            return res.sendStatus(400)
        })
}