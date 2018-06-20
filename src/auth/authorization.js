var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    var apiToken = req.headers["x-api-token"];
    jwt.verify(apiToken, "anypk", (err, decod) => {
        if (err) {
            res.status(403).json({ message: "Wrong Token" });
        } else {
            // returns { username: 'X', iat: 1529491928, exp: 1529578328 }
            req.decoded = decod;
            next();
        }
    });
} 