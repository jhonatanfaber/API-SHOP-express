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

    User.find({username})
    .then(response => {
        if(response.username == username && response.password == hashedPassword){
            let token = jwt.sign({ username }, "anypk", { expiresIn: '24h' });
            return res.status(200).send({ token });
        }
        return res.status(400).send("Invalid Credentials");
    })
    .catch(error => {
        return res.sendStatus(400)
    })
}