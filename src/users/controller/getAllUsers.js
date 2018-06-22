const users = require("./../../users.json");

module.exports = {
    getAllUsers
}
 
function getAllUsers(req,res){
    res.status(200).send(users);
}
