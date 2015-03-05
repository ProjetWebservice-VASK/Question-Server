var express = require('express');
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

app.use('/questions', router);

module.exports =app;