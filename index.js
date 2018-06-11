var express = require('express');
var app = express();
//var bodyParser = require('body-parser')
var customerController = require("./src/customers/index.js");
 
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json())

app.use("/customers", customerController);

app.listen(3000, () => {
    console.log("running at port 3000 ");
    
})