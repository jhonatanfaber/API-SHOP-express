const CustomerModel = require("./../model")

module.exports = {
    createNewCustomer: createNewCustomer
}

function createNewCustomer(req, res) {
    const { name, surname, photo } = req.body
    let customer = new CustomerModel({
        name,
        surname,
        id: surname + Date.now(),
        photo,
        createdBy: req.decoded.username,
        lastChangeBy: req.decoded.username
    })
    customer.save((error, newCustomer) => {
        if (error) return res.sendStatus(404)
        return res.status(201).json(newCustomer);
    })
}