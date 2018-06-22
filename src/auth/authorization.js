const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let apiToken = req.headers["x-api-token"] || req.query.token || req.body.token;
    jwt.verify(apiToken, "anypk", (err, decod) => {
        if (err) {
            res.status(403).json({ message: "Wrong Token" });
        } else {
            // returns { username: 'X', iat: time, exp: time }
            req.decoded = decod;
            next();
        }
    });
} 