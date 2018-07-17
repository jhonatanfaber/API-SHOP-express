const mongoose = require("mongoose")

let customerSchema = mongoose.Schema({
    name : String,
    username : String,
    id : String,
    photo : String,
    createdBy : String,
    lastChangeBy : String
})

let Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer