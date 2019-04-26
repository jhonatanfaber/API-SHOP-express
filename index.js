const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require("morgan")
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.load()

const loginController = require("./src/login/index.js");
const signupController = require("./src/signup/index.js");
const resetPasswordController = require("./src/resetPassword/index.js");
const authorization = require("./src/auth/authorization.js");
const headers = require("./src/auth/secure-headers.js");
const output = require("./src/auth/secure-output.js");
const customerController = require("./src/customers/index.js");
const adminAuthentication = require("./src/auth/adminAuthentication.js")
const userController = require("./src/users/index.js");
const coinController = require("./src/coins/index.js");

mongoose.connect(process.env.MONGO_URI + process.env.MONGO_NAME + '?retryWrites=true'
    , { useNewUrlParser: true }
);

app.get('/', async function (req, res) {
    res.send('Cryptofolio API')
})

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())


app.use("/login", loginController);
app.use("/signup", signupController);
app.use("/password", resetPasswordController);
app.use(authorization);
//app.use(headers);
app.use(output);
app.use("/customers", customerController);
app.use("/coins", coinController);
// app.use(adminAuthentication)
app.use("/users", userController);


app.use((req, res, next) => {
    const error = new Error("Page not found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: error.message
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Running at http://localhost:${process.env.PORT}`);
})