const axios = require("axios")
const dotenv = require('dotenv');
dotenv.load()

module.exports = {
    getCoins
}

let coinData = []
let coinsID = []

async function getCoins(req, res) {
    await getCoinLogo()
    return res.status(200).send(coinData)
}

async function getCoinLogo() {
    await getCoinData()
    return new Promise(async (resolve) => {
        const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=" + coinsID + "&CMC_PRO_API_KEY="+ process.env.COINMARKETCAP_APIKEY)
        coinData.forEach(coin => {
            for (const key of Object.keys(response.data.data)) {
                if (coin.id == response.data.data[key].id) {
                    coin.logo = response.data.data[key].logo
                    break;
                }
            }
        })
        resolve()
    })
}

async function getCoinData() {
    return new Promise(async (resolve) => {
        const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=" + process.env.COINMARKETCAP_APIKEY)
        coinData = response.data.data
        coinsID = response.data.data.map(coin => coin.id);
        resolve()
    })
}
