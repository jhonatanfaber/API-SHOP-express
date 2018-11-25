const CustomerModel = require("./../model")

module.exports = {
    deleteCustomer: deleteCustomer
}

function deleteCustomer(req, res) {
    CustomerModel.remove({ id: req.params.id })
        .then(response => {
            console.log(response);
            // TODO: check if user exists, response returns --> { n: 0, ok: 1 }
            //if (response) 
            return res.sendStatus(204);
            //return res.status(404).json({ Message: "No valid user ID" })
        })
        .catch(() => {
            return res.sendStatus(400)
        })
}