const APITOKEN = "qwerty"
module.exports = (req, res, next) => {
    var apiToken = req.headers["x-api-token"];
    if(apiToken !== APITOKEN){
        return res.sendStatus(403)
    }
    next();
} 