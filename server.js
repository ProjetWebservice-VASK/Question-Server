//server nodeJS
//var http = require('http');
var app = require('express.io')();
var express = require('express.io');

app.use(app.router);
app.use(express.static(__dirname + '/'));
app.use("/styles", express.static(__dirname + '/app/styles'));
app.use("/scripts", express.static(__dirname + '/app/scripts'));
app.use("/images",  express.static(__dirname + '/app/images'));
app.use("/views", express.static(__dirname + '/app/views'));
//Creatind express server
app.http().io();

// Show main page
app.get('/',function(req, res){
	console.log('a user is connected');
	res.sendfile(__dirname +'/app/index.html');
});

//Routes of the app

app.listen(9000);
