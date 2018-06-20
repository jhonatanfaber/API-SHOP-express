//var customers = require("./../../customers.json");
const fs = require("fs")
const rawdata = fs.readFileSync('./src/customers.json', 'utf8');
var data = JSON.parse(rawdata)

module.exports = {
    getCustomerByID : getCustomerByID
}

function getCustomerByID (req,res){
    let id = req.params.id;
    let user = data.find(user => user.id == id);
    if(user){
        return res.status(200).send(user);    
    }
    return res.sendStatus(400);
}