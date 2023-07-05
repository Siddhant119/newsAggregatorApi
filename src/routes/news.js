const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('c674b359d3a54c43873c6cb4ce7570c9');
const newsRoutes = require('express').Router();
const verifyToken = require('../middleware/authJWS');
const bodyParser = require('body-parser');
const validator = require('../helper/validator');
const { response } = require('express');

newsRoutes.use(bodyParser.urlencoded({extended: false}));
newsRoutes.use(bodyParser.json());

newsRoutes.get('/',verifyToken,(req,res) => {
    if(!req.user && req.message==null) {
        res.status(403).send({
            message: 'INVALID JWT TOKEN'
        });
    } else if(!req.user) {
        res.status(403).send({
            message : req.message
        });
    }
    let userPref = req.user.preferences;
    newsapi.v2.topHeadlines({
        category: userPref.category,
        language: userPref.language,
        country: userPref.country,
    }).then(response => {
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send(err);
    });
});

module.exports = newsRoutes;