const customers = require("./../../customers.json");

module.exports = {
    getAllCustomers : getAllCustomers
}
 
function getAllCustomers(req,res){
    res.status(200).send(customers);
}