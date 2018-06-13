const fs = require("fs")
let rawdata = fs.readFileSync('./src/customers.json', 'utf8');
var data = JSON.parse(rawdata)
 

module.exports = {
    createNewCustomer : createNewCustomer 
}

function createNewCustomer (req, res){
    var newCustomer = createUser(req)
    data.push(newCustomer)
    let newCustomerJSON = JSON.stringify(data, null, 2);  
    fs.writeFileSync('./src/customers.json', newCustomerJSON);
    newCustomer = {}
    return res.sendStatus(201)
}

function createUser(req){
    var newCustomer = {
        name : req.body.name,
        username : req.body.username,
        id : req.body.username + Date.now(),
        photo : req.body.photo
    }
    return newCustomer
}