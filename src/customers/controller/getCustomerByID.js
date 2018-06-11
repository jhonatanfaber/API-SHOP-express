var customers = require("./../../customers.json");

module.exports = {
    getCustomerByID : getCustomerByID
}

function getCustomerByID (req,res){
    var id = req.params.id;
    var user = customers.find(user => user.id == id);
    if(user){
        return res.status(200).send(user);    
    }
    return res.sendStatus(400);
}