const CustomerModel = require("./../model")

module.exports = {
    getAllCustomers: getAllCustomers
}

function getAllCustomers(req, res) {
    CustomerModel.find()
        .then(response => {
            res.status(200).send(response)
        })
}