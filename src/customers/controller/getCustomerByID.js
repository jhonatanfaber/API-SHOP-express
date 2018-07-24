const CustomerModel = require("./../model")

module.exports = {
    getCustomerByID: getCustomerByID
}

function getCustomerByID(req, res) {
    CustomerModel.findOne({ id: req.params.id })
        .then(user => {
            if (user) return res.status(200).send(user)
            return res.status(404).json({ Message: "No valid user ID" })
        })
        .catch(error => {
            return res.sendStatus(400)
        })
}