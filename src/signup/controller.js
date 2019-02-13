const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const UserModel = require("./../users/model")

module.exports = {
    signup
}

function signup(req, res) {
    const { name, username, password, admin, email } = req.body
    let user = new UserModel.User({
        name: name,
        email: email,
        username: username,
        password: hashPassword(password),
        id: username + Date.now(),
        admin: false
    })

    UserModel.User.find({ $or: [{ username: req.body.username }, { email: req.body.email }] }, (error, dbUser) => {
        if (dbUser.length) {
            return res.status(409).send({ error: "User already exists with same username or email" });
        }
        user.save(((error, newUser) => {
            if (error) return res.sendStatus(404)
            return res.status(201).json(newUser);
        }))
    })
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}    
