const UserModel = require("./../users/model")

module.exports = (req, res, next) => {
    UserModel.User.findOne({ username: req.decoded.username })
        .then(response => {
           if (!response.admin) return res.sendStatus(403)
            next()
        })
        .catch(() => {
            return res.sendStatus(400)
        })
}