const User = require("./../users/model")

module.exports = (req, res, next) => {
    User.findOne({ username: req.decoded.username })
        .then(response => {
            if (!response.admin) return res.sendStatus(403)
            next()
        })
        .catch(error => {
            return res.sendStatus(400)
        })
}