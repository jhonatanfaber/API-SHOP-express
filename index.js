var express = require('express');
var app = express();
var customerController = require("./src/customers/index.js");
 
app.use(express.json());
app.use("/customers", customerController);

app.listen(3000, () => {
    console.log("running at port 3000 ");
    
})