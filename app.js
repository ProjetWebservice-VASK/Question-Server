var express = require('express');
var http = require('http');
var app = express();

app.get('/', function (req, res) {
    res.status(200).send('Hello World !');
});

http.createServer(app).listen(8081);