var crypto = require('crypto');
var jwt = require("jsonwebtoken");
const fs = require("fs")

let rawdata = fs.readFileSync('./src/users.json', 'utf8');
var data = JSON.parse(rawdata)

module.exports = {
    signIn
}

function signIn(req, res, next) {
    var username = req.body.username;
    var rawPassword = req.body.password;
    let hashedPassword = crypto.createHash('sha256').update(rawPassword).digest("hex")
    var validUser = validateUser(username, hashedPassword);
    if (validUser) {
        var token = jwt.sign({ username }, "anypk", { expiresIn: '24h' });
        return res.status(200).send({ token });
    }
    return res.status(400).send("Invalid Credentials");
}

function validateUser(username, hashedPassword) {
    return data.some(user => user.username == username && user.password == hashedPassword)
}