var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var helmet = require('helmet')
var customerController = require("./src/customers/index.js");
var authorization = require("./src/customers/auth/authorization.js"); 
var headers = require("./src/customers/auth/secure-headers.js"); 
var output = require("./src/customers/auth/secure-output.js"); 

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(helmet())

app.use(authorization);
app.use(headers);
app.use(output);

/** Routes */
app.use("/customers", customerController);

app.listen(3000, () => {
    console.log("running at port 3000 ");
})