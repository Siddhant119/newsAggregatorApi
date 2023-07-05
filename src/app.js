const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();
const {signUp,signIn} = require('../src/controllers/authController');
const user = require('../src/userInfo.json');
const preferences = require('./routes/preferences');
const news = require('./routes/news');

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

routes.use(bodyParser.urlencoded({extended: false}));
routes.use(bodyParser.json());

const PORT = 3000;

routes.post('/register',signUp);

routes.post('/login',signIn);

routes.use('/news',news);
    
routes.use('/preferences',preferences);

app.listen(PORT, (err) =>{
    if(!err)
        console.log('Server started Successfully');
    else
        console.log('Some error has occured');
});

module.exports = app;