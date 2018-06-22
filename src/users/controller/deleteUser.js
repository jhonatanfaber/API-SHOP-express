const fs = require("fs")
const rawData = fs.readFileSync("./src/users.json", "utf8")
var data = JSON.parse(rawData)

module.exports = {
    deleteUser
}

function deleteUser(req, res) {
    let id = req.params.id
    let userExists = checkIfUserExist(id)
    if (userExists) {
        let filteresList = data.filter(user => user.id != id)
        data.push(filteresList)
        let newUserJSON = JSON.stringify(filteresList, null, 2);
        fs.writeFileSync('./src/users.json', newUserJSON);
        return res.sendStatus(204);
    }
    return res.sendStatus(404)

}

function checkIfUserExist(id) {
    return data.some(user => user.id == id)
}