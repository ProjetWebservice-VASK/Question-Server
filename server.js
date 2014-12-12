//Globals
var PORT = 9000;

//server nodeJS
var express = require('express');
var mongoose = require('mongoose');
var swagger = require('swagger-node-express');
var config = require('./config');
var server = express();

//BDD
var node_env = process.env.NODE_ENV || 'development';
server.set('dbUrl', config.db[node_env]);
mongoose.connect(server.get('dbUrl'),function(){
  console.log('yepekai!');
});

//Routes
server.get('/',function(req, res){
  res.send('hello world');
});

//Routes of the app
server.listen(PORT, function(){
  console.log("Question Server listening on port "+ PORT);
});
