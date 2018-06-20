const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const helmet = require('helmet')

const customerController = require("./src/customers/index.js");
const authorization = require("./src/auth/authorization.js"); 
const headers = require("./src/auth/secure-headers.js"); 
const output = require("./src/auth/secure-output.js"); 
const userController = require("./src/login/index.js");

const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(helmet())

app.use("/login", userController);

app.use(authorization);
app.use(headers);
app.use(output);

app.use("/customers", customerController);

app.listen(PORT, () => { 
    console.log(`Running at http://localhost:${PORT}`);
})