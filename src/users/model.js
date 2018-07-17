const mongoose = require("mongoose")

let userSchema = mongoose.Schema({
    name : String,
    username : String,
    password : String,
    id : String,
    admin : Boolean
})

let User = mongoose.model('user', userSchema)

module.exports = User