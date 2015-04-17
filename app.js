var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var router = require('./route/router');
var mongoose = require('mongoose');

mongoose.connect(config.db[(process.env.NODE_ENV || 'development')]);
var db = mongoose.connection;

db.once('open', function (callback) {
    console.log('Connected to ' + config.db[(process.env.NODE_ENV || 'development')]);
});

db.on('error', console.error.bind(console, 'connection error'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/**
 * Swagger API endpoint
 */
app.use('/api', express.static(__dirname + '/swagger'));

/**
 * Enable CORS
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/questions', router);

module.exports = app;