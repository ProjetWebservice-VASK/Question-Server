var express = require('express');
var app = express();
var config = require('./config');
var router = require('./route/router');
var mongoose = require('mongoose');

var db = mongoose.createConnection(config.db.test);;

db.once('open', function (callback) {
    console.log('connected');
});

db.on('error', console.error.bind(console, 'connection error'));

app.use('/questions', router);

module.exports =app;