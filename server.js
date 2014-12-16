//Globals
var PORT = process.env.PORT || 80;

//server nodeJS
var express = require('express'),
mongoose = require('mongoose'),
swagger = require('swagger-node-express'),
config = require('./config'),
server = express();

server.use(express.static('server'));

//BDD
var node_env = process.env.NODE_ENV || 'development';
server.set('dbUrl', config.db[node_env]);
mongoose.connect(server.get('dbUrl'),function(){
  console.log('Connection to database is good.');
});

//Routes
var questions = require('./server/routes/questions');
server.use('/questions',questions);

server.get('/',function(req, res){
  res.redirect('/questions');
});

//Routes of the app
server.listen(PORT, function(){
  console.log("Question Server listening on port " + PORT);
});
