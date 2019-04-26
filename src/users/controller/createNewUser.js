const crypto = require('crypto');
const UserModel = require('./../model');

module.exports = {
    createNewUser
}

function createNewUser(req, res) {
    const { name, username, password, admin, email } = req.body
    let user = new UserModel.User({
        name: name,
        email: email,
        username: username,
        password: hashPassword(password),
        id: username + Date.now(),
        admin: admin || false,
        exchange : null,
        apikey : null,
        secret : null
    })

    UserModel.User.find({ $or: [{ username: req.body.username }, { email: req.body.email }] }, (error, dbUser) => {
        if (dbUser.length) {
            return res.status(409).send({ error: "User already exists with same username or email" });
        }
        console.log(user);
        
        user.save(((error, newUser) => {
            if (error) return res.sendStatus(404)
            return res.status(201).json(newUser);
        }))
    })
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}