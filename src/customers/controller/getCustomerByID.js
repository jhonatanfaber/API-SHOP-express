//var customers = require("./../../customers.json");
const fs = require("fs")
let rawdata = fs.readFileSync('./src/customers.json', 'utf8');
var data = JSON.parse(rawdata)

module.exports = {
    getCustomerByID : getCustomerByID
}

function getCustomerByID (req,res){
    var id = req.params.id;
    var user = data.find(user => user.id == id);
    if(user){
        return res.status(200).send(user);    
    }
    return res.sendStatus(400);
}