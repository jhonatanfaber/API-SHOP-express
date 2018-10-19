const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const User = require("./../users/model")

module.exports = {
    signIn
}

function signIn(req, res, next) {
    let username = req.body.username;
    let rawPassword = req.body.password;
    let hashedPassword = crypto.createHash('sha256').update(rawPassword).digest("hex")
    User.findOne({ username: username })
        .then(response => {
            if (response.username == username && response.password == hashedPassword) {
                let { name, username, id, admin } = response
                let expiresInValue = 10
                let token = jwt.sign({ username }, "anypk", { expiresIn: expiresInValue });
                return res.status(200).send({
                    name,
                    username,
                    id,
                    admin,
                    token,
                    expiresIn : expiresInValue
                });
            }
            return res.status(400).send("Invalid Credentials");
        })
        .catch(error => {
            return res.sendStatus(400)
        })
}