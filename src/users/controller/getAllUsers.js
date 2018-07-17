const users = require("./../../users.json");
const UserModel = require('./../model');

module.exports = {
    getAllUsers
}

function getAllUsers(req, res) {
    UserModel.find()
        .then(response => {
            res.status(200).send(response);
        })
}
