const verifyToken = require('../middleware/authJWS');
const prefRoutes = require('express').Router();
const user = require('../userInfo.json');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const validator = require('../helper/validator');

prefRoutes.use(bodyParser.urlencoded({extended: false}));
prefRoutes.use(bodyParser.json());

prefRoutes.get('/',verifyToken, (req,res) => {
    if(!req.user && req.message==null) {
        res.status(403).send({
            message: 'INVALID JWT TOKEN'
        });
    } else if(!req.user) {
        res.status(403).send({
            message : req.message
        });
    }
    res.status(200);
    res.send(req.user.preferences);
});

prefRoutes.put('/',verifyToken, (req, res) => {
    if(!req.user && req.message==null) {
        res.status(403).send({
            message: 'INVALID JWT TOKEN'
        });
    } else if(!req.user) {
        res.status(403).send({
            message : req.message
        });
    }
    let loggedInUser = user.find(val=> val.email==req.user.email);
    let userUpdated = user.filter(val=>val.email!=req.user.email);
    let newPref = req.body;
    if(validator.validatePref(newPref).status) {
        if(process.env.NODE_ENV != 'test1') {
            loggedInUser.preferences = newPref;
            userUpdated.push(loggedInUser);
            let writePath = path.join(__dirname,'..','userInfo.json');
            fs.writeFileSync(writePath,JSON.stringify(userUpdated), {encoding: 'utf8' , flag: 'w'});
        }
        res.status(200).send('Preferences have been updated');
    } else {
        res.status(500).send(validator.validatePref(newPref).message);
    }
});


module.exports = prefRoutes;