const UserModel = require("../model")
const crypto = require('crypto')
const axios = require('axios')

module.exports = {
    updatePartiallyUserData
}

function updatePartiallyUserData(req, res) {
    let id = req.params.id
    let exchange = req.body.ex_name
    let apikey = req.body.apikey
    let raw_secret = req.body.secret
    let secret = hashText(raw_secret)

    connectToBittrex(req, res, secret)

    UserModel.User.update({ id }, { $set: req.body, exchange, apikey, secret }, { upsert: true }, (error) => {
        if (error) {
            return res.sendStatus(400)
        }
        return res.sendStatus(204)
    })
}

function hashText(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
}

async function connectToBittrex(req, res, secretkey) {
    let apiToken = req.headers["x-api-token"] || req.query.token || req.body.token;
    let coinsData = await getCoinsData(apiToken)
    let exchangeData = null
    const nonce = Date.now().toString()
    let key = req.body.apikey
    const uri = `https://api.bittrex.com/api/v1.1/account/getbalances?apikey=${key}&nonce=${nonce}`

    const secret = secretkey
    const signature = crypto.createHmac('sha512', secret)
        .update(uri)
        .digest('hex');

    try {
        const response = await axios.get(uri, {
            headers: {
                'apisign': signature,
                'Content-Type': 'application/json'
            }
        })
        exchangeData = [...response.data.result];

    } catch (e) {
        console.log('ERROR ****:   ' + e)
    }
    await removeCurrentCoinsFromDB(req, res)
    addCoinToDB(exchangeData, coinsData, req, res)
}

function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today
}

async function getCoinsData(apiToken) {

    let coinsData = null
    try {
        const response = await axios.get('http://localhost:3000/coins', {
            headers: {
                'x-api-token': apiToken
            }
        })
        coinsData = [...response.data]
    } catch (e) {
        console.log(e);
    }
    return coinsData
}

function addCoinToDB(exchangeData, coinsData, req, res) {
    exchangeData.forEach(exchange => {
        coinsData.forEach(coin => {
            if (exchange.Currency == coin.symbol && exchange.Balance > 0) {

                let newCoinCard = {
                    coinID: coin.id,
                    cardID: exchange.Currency + Date.now(),
                    amount: exchange.Balance,
                    boughtDate: getCurrentDate(),
                    usdBuyPrice: 1,
                    logo: coin.logo,
                    name: coin.name,
                    symbol: exchange.Currency,
                    issuedBy: req.body.ex_name
                }

                UserModel.User.findOne({ id: req.params.id })
                    .then(user => {
                        user.cards.push(newCoinCard)
                        user.save()
                        return res.status(200).send(user)
                    })
                    .catch(() => {
                        return res.sendStatus(400)
                    })
            }
        })
    });
}

function removeCurrentCoinsFromDB(req, res) {
    return new Promise((resolve) => {
        UserModel.User.findOne({ id: req.params.id })
            .then(user => {
                user.cards = user.cards.filter(card => card.issuedBy != req.body.ex_name)
                user.save()
                resolve()
                return res.sendStatus(204);
            })
            .catch(() => {
                return res.sendStatus(400)
            })
    })
}


