# newsAggregatorApi
RESTful API that allows users to fetch news articles from multiple sources based on their preferences.

Implement a RESTful API with the following endpoints:

POST /register: Register a new user.
POST /login: Log in a user.
GET /preferences: Retrieve the news preferences for the logged-in user.
PUT /preferences: Update the news preferences for the logged-in user.
GET /news: Fetch news articles based on the logged-in user's preferences.

Preferences Example : 
{
    "categories": "business , racing",
    "language" : "en",
    "country": "us"
}

If any property is missing or its value is empty , it will return an error

Delete pacakge-lock.json
Remove contents of package.json

Please run following commands on terminal to install required packages : 
npm init -y
npm install express
npm install --save nodemon
npm install --save bcrypt
npm install --save body-parser
npm install --save cors
npm install --save dotenv
npm install --save jsonwebtoken
npm install --save newsapi

In package.json file , inside "scripts" , add the following script
"start" : "nodemon src/app.js