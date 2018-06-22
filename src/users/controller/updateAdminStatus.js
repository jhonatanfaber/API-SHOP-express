const fs = require("fs")
const crypto = require('crypto');
const rawData = fs.readFileSync("./src/users.json")
var data = JSON.parse(rawData)

module.exports = {
    updateAdminStatus
}

function updateAdminStatus(req, res) {
    let id = req.params.id
    let userExists = checkIfUserExists(id)
    if (userExists) {
        let updatedStatus = updateStatus(req, id)
        let filteredList = data.filter(user => user.id != id)
        filteredList.push(updatedStatus)

        let newUserJSON = JSON.stringify(filteredList, null, 2)
        fs.writeFileSync("./src/users.json", newUserJSON)
        updatedStatus = {}
        return res.sendStatus(204)
    }
    return res.sendStatus(404)
}

function checkIfUserExists(id) {
    return data.some(user => user.id == id)
}

function updateStatus(req, id) {
    let actualUserInfo = data.find(user => user.id == id);
    return updatedStatus = {
        name: actualUserInfo.name,
        username: actualUserInfo.username,
        password: actualUserInfo.password,
        id,
        admin: req.body.admin
    }
}

