const CustomerModel = require("./../model")

module.exports = {
    updateCustomer: updateCustomer
}

function updateCustomer(req, res) {
    CustomerModel.update({ id: req.params.id }, { $set: req.body })
        .then(response => {
            return res.sendStatus(204)
        })
        .catch(() => {
            res.sendStatus(400)
        })
}