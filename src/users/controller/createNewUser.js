const crypto = require('crypto');
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
    user.save(((error,newUser) => {
        if (error) return res.sendStatus(404)
        return res.status(201).json(newUser);
    }))
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}