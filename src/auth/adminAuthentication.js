const fs = require("fs")
const rawData = fs.readFileSync("./src/users.json")
var  data = JSON.parse(rawData)

module.exports = (req, res, next) => {
    let username = req.decoded.username
    let user = data.find(user => user.username == username)
    if(!user.admin){
        return res.sendStatus(403)
    }
    next()  
}