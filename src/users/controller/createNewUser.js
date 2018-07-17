const fs = require("fs")
const crypto = require('crypto');
const rawData = fs.readFileSync('./src/users.json','utf8')
var data = JSON.parse(rawData)
const UserModel = require('./../model');

module.exports = {
    createNewUser
}

function createNewUser(req, res, next){
    
    let newUser = createUser(req)
    data.push(newUser)
    let newUserJSON = JSON.stringify(data, null, 2);  
    fs.writeFileSync('./src/users.json', newUserJSON);
    newUser = {}
    res.sendStatus(201);
}

function createUser(req){
    const {name, username, password, admin} = req.body
    return newUser = {
        name,
        username,
        password : hashPassword(password),
        id : username + Date.now(),
        admin
    }
}

function hashPassword(pass) {
    return crypto.createHash('sha256').update(pass).digest('hex');
}