const UserModel = require('./../model');

module.exports = {
    getAllUsers
}

function getAllUsers(req, res) {
    UserModel.User.find()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(() => {
            res.sendStatus(404)
        })
}
