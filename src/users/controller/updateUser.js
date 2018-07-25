const crypto = require('crypto');
const UserModel = require("./../model")

module.exports = {
    updateUser
}

function updateUser(req, res) {
    let id = req.params.id
    let { name, password, admin } = req.body

    UserModel.findOne({ id: id })
        .then((document) => {
            if (document) {
                document.name = name,
                document.password = hashPassword(password),
                document.admin = admin
                document.save()
                return res.sendStatus(204)
            }
            return res.status(404).json({ Message: "No valid user ID" })
        })
        .catch(error => {
            return res.sendStatus(400)
        })
}

function hashPassword(pass) {
    return crypto.createHash('sha256').update(pass).digest('hex');
}