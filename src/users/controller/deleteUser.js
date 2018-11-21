const UserModel = require("./../model")

module.exports = {
    deleteUser
}

function deleteUser(req, res) {
    let id = req.params.id
    UserModel.User.remove({id : id})
        .then(response => {
            if(response) return res.sendStatus(204);
            return res.status(404).json({Message : "No valid user ID"})
        })
        .catch(() => {
            return res.sendStatus(400)
        })
}