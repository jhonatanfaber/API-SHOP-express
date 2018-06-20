const fs = require('fs');
const rawdata = fs.readFileSync('./src/customers.json', 'utf8');
var data = JSON.parse(rawdata)

module.exports = {
    updateCustomer : updateCustomer 
}

function updateCustomer(req, res){
    let id = req.params.id; 
    let exist = checkIfUserExists(id);
    if(!exist){
        return res.sendStatus(400)
    }

    let updatedUser = createEditedUser(req, id);
    let filteredList = data.filter(user => user.id != id);
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
    let updatedUser = {};
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