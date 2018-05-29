var customers = require("./../../customers.json");

module.exports = {
    getAllCustomers : getAllCustomers
}
 
function getAllCustomers(req,res){
    res.send(customers)
}