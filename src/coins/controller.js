const axios = require("axios")

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
        const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=" + coinsID + "&CMC_PRO_API_KEY=da29af3e-a894-43d1-805e-f64def15b26c")
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
        const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=da29af3e-a894-43d1-805e-f64def15b26c")
        coinData = response.data.data
        coinsID = response.data.data.map(coin => coin.id);
        resolve()
    })
}
