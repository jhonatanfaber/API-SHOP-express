var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var helmet = require('helmet')
var customerController = require("./src/customers/index.js");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(helmet())

/** Validate content-type header */
app.use(function (req, res, next) {
    var contype = req.headers['content-type'];
    if (!contype || contype != 'application/json') {
        return res.sendStatus(406);
    }
    next();
});

/** Secure output  */
app.use("/customers", function (req, res, next) {
    res.set("content-type", "application/json")
    next();
});

/** Routes */
app.use("/customers", customerController);



app.listen(3000, () => {
    console.log("running at port 3000 ");

})