// import all the required packages
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');
// deal with authentication and authorization
require("dotenv-safe").load(); 
var jwt = require('jsonwebtoken');

// import routes
var routes = require('./routes/index');

// creates an express application
var app = express();

// define parameters for api
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.json({limit: '999mb'}));
app.use(compression());

// define routes with the mount path (\download)
app.use('/download/api', routes);

// export app
module.exports = app;