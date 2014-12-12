//Globals
var PORT = 9000;

//server nodeJS
var express = require('express');
var mongoose = require('mongoose');
var swagger = require('swagger-node-express');
var server = express();

mongoose.connect('mongodb://localhost/questions');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("yay!");
});

//Routes
server.get('/',function(req, res){
  res.send('hello world');
});

//Routes of the app
server.listen(PORT, function(){
  console.log("Question Server listening on port"+ PORT);
});
