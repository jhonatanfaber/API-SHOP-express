const fs = require("fs")
const crypto = require('crypto');
const rawData = fs.readFileSync("./src/users.json")
var data = JSON.parse(rawData)

module.exports = {
    updateUser
}

function updateUser(req, res) {
    let id = req.params.id
    let userExists = checkIfUserExists(id)
    if (userExists) {
        let updatedUser = updateInfo(req, id)
        let filteredList = data.filter(user => user.id != id)
        filteredList.push(updatedUser)

        let newUserJSON = JSON.stringify(filteredList, null, 2)
        fs.writeFileSync("./src/users.json", newUserJSON)
        updateInfo = {}
        return res.sendStatus(204)
    }
    return res.sendStatus(404)
}

function checkIfUserExists(id) {
    return data.some(user => user.id == id)
}

function updateInfo(req, id) {
    let { name, password, admin } = req.body
    let actualUserInfo = data.find(user => user.id == id);
    return updatedUser = {
        name,
        username: actualUserInfo.username,
        password: hashPassword(password),
        id,
        admin
    }
}

function hashPassword(pass) {
    return crypto.createHash('sha256').update(pass).digest('hex');
}