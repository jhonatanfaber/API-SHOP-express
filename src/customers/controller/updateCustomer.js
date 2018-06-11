const fs = require('fs');
let rawdata = fs.readFileSync('./src/customers.json', 'utf8');
var data = JSON.parse(rawdata)

module.exports = {
    updateCustomer : updateCustomer 
}

function updateCustomer(req, res){
    var id = req.params.id; 
    var exist = checkIfExist(id);
    if(!exist){
        return res.sendStatus(400)
    }

    var updatedUser = createEditedUser(req, id);
    var filteredList = data.filter(user => user.id != id);
    filteredList.push(updatedUser);

    let newCustomerJSON = JSON.stringify(filteredList, null, 2); 
    fs.writeFileSync('./src/customers.json', newCustomerJSON);
    updatedUser = {};
    return res.sendStatus(200);
}

function checkIfExist(id){
    return data.some(user => user.id == id);
}

function createEditedUser(req, id){
    var updatedUser = {};
    var user = data.find(user => user.id == id);
    var username = user.username;

    updatedUser = {
        name : req.body.name,
        username : username,
        id : id,
        photo : req.body.photo 
    }
    return updatedUser;
}