//Globals
var PORT = 9000;

//server nodeJS
var express = require('express');
var server = express();

//Routes
server.get('/',function(req, res){
  res.send('hello world');
});

//Routes of the app
server.listen(PORT, function(){
  console.log("Question Server listening on port"+ PORT);
});
