const crypto = require('crypto');
const UserModel = require("./../model")

module.exports = {
    updateUser
}

function updateUser(req, res) {
    let id = req.params.id
    UserModel.update({ id }, { $set: req.body, password: hashPassword(req.body.password) })
        .then(response => {
            return res.sendStatus(204)
        })
        .catch(error => {
            res.sendStatus(400)
        })
}

function hashPassword(pass) {
    return crypto.createHash('sha256').update(pass).digest('hex');
}