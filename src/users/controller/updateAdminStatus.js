const UserModel = require("./../model")

module.exports = {
    updateAdminStatus
}

function updateAdminStatus(req, res) {
    let id = req.params.id
    UserModel.update({ id }, { $set: req.body})
        .then(response => {
            return res.sendStatus(204)
        })
        .catch(error => {
            res.sendStatus(400)
        })
}


