var express = require('express');
var http = require('http');
var app = express();

app.get('/', function (req, res) {
    res.status(200).send("YEEEEEEEEAAAH !");
});

module.exports =app;