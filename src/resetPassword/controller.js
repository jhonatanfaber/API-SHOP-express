const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const UserModel = require("./../users/model")
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.load()

module.exports = {
    resetPassword,
    forgotPassword
}

async function resetPassword(req, res) {
    let token = req.body.token
    let id = req.body.id
    let user = await getUserData(id, res)

    // let apiToken = req.headers["x-api-token"] || req.query.token || req.body.token;
    jwt.verify(token, user.password, (err, decod) => {
        if (err) {
            res.status(403).send({ message: "Reset option rejected. Wrong Token! " });
        } else {
            // returns { payload:{ id, email }, iat: time, exp: time }, see below function
            req.decoded = decod;
            let userID = req.decoded.payload.id;

            // new param: bool - if true, return the modified document rather than the original.
            UserModel.User.findOneAndUpdate({ id: userID }, { $set: req.body, password: hashPassword(req.body.password) }, { new: true }, (error, user) => {
                if (error) {
                    return res.sendStatus(400)
                }
                return res.status(200).send("Your password has been successfully changed");
            })
        }
    });
}


function forgotPassword(req, res) {
    if (req.body.email !== undefined) {
        UserModel.User.find({ email: req.body.email }, (error, dbUser) => {
            if (dbUser.length) {
                let userID;
                let userPassword;
                dbUser.forEach(user => {
                    userPassword = user.password
                    userID = user.id
                })

                let payload = {
                    id: userID,        // User ID from database
                    email: req.body.email
                };
                let expiresInValue = 3600 // expressed in seconds
                let token = jwt.sign({ payload }, userPassword, { expiresIn: expiresInValue });
                sendEmail(req, userID, token)

                res.status(200).json("Email sent");
            } else {
                res.status(404).json("Email does not match with any user")
            }
            if (error) return res.sendStatus(404)
        })
    } else {
        res.status(404).json('Email address is missing.');
    }
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function getUserData(id, res) {
    return UserModel.User.findOne({ id })
        .then(user => {
            if (user) return user
            return res.status(404).json({ Message: "No valid user ID" })
        })
        .catch(() => {
            return res.sendStatus(400)
        })
}

function sendEmail(req, userID, token) {
    sgMail.setApiKey(process.env.SENDGRID_APIKEY);
    const message = {
        to: req.body.email,
        from: process.env.EMAIL,
        subject: 'Password Change Request',
        html: `
                <span> Please use the following link to 
                <a href=https://cryptofolio.now.sh/reset_password?id=${userID}&token=${token}>reset your password</a> 
                </span> 
    
                <p> If you didn't request this password change, please feel free to ignore it</p> 
                <p> Do not hesitate to contact us if you have any questions at: 
                    <span>${process.env.EMAIL}</span> 
                </p> 
            `
    };
    sgMail.send(message);
}