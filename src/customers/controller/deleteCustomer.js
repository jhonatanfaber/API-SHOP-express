const fs = require("fs");
let rawdata = fs.readFileSync('./src/customers.json', 'utf8');
var data = JSON.parse(rawdata)

module.exports = {
    deleteCustomer : deleteCustomer
}

function deleteCustomer(req, res){
    var id = req.params.id;
    var exist = checkIfUserExists(id);
    if(!exist){
        return res.sendStatus(400)
    }

    var filteredUserList = data.filter(user => user.id != id);
    data.push(filteredUserList);
    let newCustomerJSON = JSON.stringify(filteredUserList, null, 2); 
    fs.writeFileSync('./src/customers.json', newCustomerJSON);
    return res.sendStatus(200);
}

function checkIfUserExists(id){
    return data.some(user => user.id == id);
}