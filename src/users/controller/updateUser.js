const crypto = require('crypto');
const UserModel = require("./../model")

module.exports = {
    updateUser
}

function updateUser(req, res) {
    let id = req.params.id
    // new param: bool - if true, return the modified document rather than the original.
    UserModel.User.findOneAndUpdate({ id }, { $set: req.body, password: hashPassword(req.body.password) }, { new: true }, (error, user) => {
        if (error) {
            return res.sendStatus(400)
        }
        return res.status(200).send(user);
    })
}

function hashPassword(pass) {
    return crypto.createHash('sha256').update(pass).digest('hex');
}