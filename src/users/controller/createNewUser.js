const fs = require("fs")
const crypto = require('crypto');
const rawData = fs.readFileSync('./src/users.json', 'utf8')
var data = JSON.parse(rawData)
const UserModel = require('./../model');

module.exports = {
    createNewUser
}

function createNewUser(req, res, next) {
    const { name, username, password, admin } = req.body
    let user = new UserModel({
        name: name,
        username: username,
        password: hashPassword(password),
        id: username + Date.now(),
        admin: admin
    })
    user.save()
    res.sendStatus(201);
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}