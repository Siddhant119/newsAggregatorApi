const jwt = require('jsonwebtoken');
user = require('../userInfo.json');

const verifyToken = ( req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err,decode) {
            if(err) {
                req.user = undefined;
                next();
            }
            else {
                email = decode.email;
                userloggedIn = user.find(val => val.email==email);
                if(userloggedIn==={}) {
                    res.status(500).send({
                        message : 'User not found'
                    });
                } else {
                    req.user = userloggedIn;
                }
                next();
            }
        })
    }   else {
        req.user = undefined;
        req.message = "Authorization header not found";
        next(); 
    }
};

module.exports = verifyToken;