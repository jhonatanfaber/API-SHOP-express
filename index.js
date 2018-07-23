const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require("morgan")

const loginController = require("./src/login/index.js");
const authorization = require("./src/auth/authorization.js"); 
const headers = require("./src/auth/secure-headers.js"); 
const output = require("./src/auth/secure-output.js"); 
const customerController = require("./src/customers/index.js");
const adminAuthentication = require("./src/auth/adminAuthentication.js")
const userController = require("./src/users/index.js");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apishopDB');


const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(helmet())

app.use("/login", loginController);
app.use(authorization);
app.use(headers);
app.use(output);
app.use("/customers", customerController);
app.use(adminAuthentication)
app.use("/users", userController);

app.listen(PORT, () => { 
    console.log(`Running at http://localhost:${PORT}`);
})