const mongoose = require("mongoose")

let cardSchema = mongoose.Schema({
    cardID: String,
    amount: Number,
    boughtDate: String,
    coinID: String,
    usdBuyPrice: Number,
    logo: String,
    name: String,
    symbol: String,
    issuedBy: String
})
let Card = mongoose.model('Card', cardSchema)


let userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    id: String,
    admin: Boolean,
    exchange : String,
    apikey : String,
    secret : String,
    cards: [Card.schema]
})
let User = mongoose.model('User', userSchema)

module.exports = {
    User,
    Card
} 