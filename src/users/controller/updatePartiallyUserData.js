const UserModel = require("../model")

module.exports = {
    updatePartiallyUserData
}

function updatePartiallyUserData(req, res) {
    let id = req.params.id
    UserModel.User.update({ id }, { $set: req.body },{ upsert: true })
        .then(() => {
            return res.sendStatus(204)
        })
        .catch(() => {
            res.sendStatus(400)
        })
}


