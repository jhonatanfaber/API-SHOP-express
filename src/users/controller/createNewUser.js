const fs = require("fs")
const rawData = fs.readFileSync('./src/users.json','utf8')
var data = JSON.parse(rawData)

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
        password,
        id : username + Date.now(),
        admin
    }
}