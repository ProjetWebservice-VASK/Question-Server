var express = require('express');
var app = express();
var router = require('./route/router');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.once('open', function (callback) {
    console.log('connected');
});

db.on('error', console.error.bind(console, 'connection error'));

app.use('/questions', router);

module.exports =app;