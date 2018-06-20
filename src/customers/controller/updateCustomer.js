const fs = require('fs');
let rawdata = fs.readFileSync('./src/customers.json', 'utf8');
var data = JSON.parse(rawdata)

module.exports = {
    updateCustomer : updateCustomer 
}

function updateCustomer(req, res){
    var id = req.params.id; 
    var exist = checkIfUserExists(id);
    if(!exist){
        return res.sendStatus(400)
    }

    var updatedUser = createEditedUser(req, id);
    var filteredList = data.filter(user => user.id != id);
    filteredList.push(updatedUser);

    let newCustomerJSON = JSON.stringify(filteredList, null, 2); 
    fs.writeFileSync('./src/customers.json', newCustomerJSON);
    updatedUser = {};
    return res.sendStatus(204);
}

function checkIfUserExists(id){
    return data.some(user => user.id == id);
}

function createEditedUser(req, id){
    var updatedUser = {};
    let user = data.find(user => user.id == id);
    let createdBy = user.createdBy;

    updatedUser = {
        name : req.body.name,
        surname : req.body.surname,
        id : id,
        photo : req.body.photo ,
        createdBy : createdBy,
        lastChangeBy : req.decoded.username
    }
    return updatedUser;
}