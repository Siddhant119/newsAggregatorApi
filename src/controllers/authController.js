var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var user = require('../userInfo.json');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const validator = require('../helper/validator');
const { userInfo } = require('os');
require('dotenv').config();

var signUp = (req,res) => {
    const signUpDetails = req.body;
    let writePath = path.join(__dirname,'..','userInfo.json');
    if(validator.validateSignUp(signUpDetails).status) {
        signUpDetails.password = bcrypt.hashSync(signUpDetails.password,8);
        user.push(signUpDetails);
        fs.writeFileSync(writePath,JSON.stringify(user), {encoding: 'utf8' , flag: 'w'});
        res.status(200).send("User has been registered");
    }
    else
        res.status(500).send(validator.validateSignUp(signUpDetails).message);
};

var signIn =(req,res) => {
    let userDetail = user.find(val => val.email==req.body.email);
    if(userDetail==={})
        return res.status(404).send({"message" : "User not found"});
    var passwordIsValid = bcrypt.compareSync(req.body.password,userDetail.password);
    if(!passwordIsValid) {
        return res.status(401).send({
            accessToken : null,
            message : "Invalid password"
        });
    }
    var token = jwt.sign({
        email: userDetail.email
    },process.env.API_SECRET, {
        expiresIn: 86400
    });
    return res.status(200).send({
        user: {
            email: userDetail.email,
            fullName: userDetail.fullName
        },
        message: "Login Successful",
        accessToken: token
    });
};
    
module.exports = {signUp,signIn};