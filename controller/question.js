var Question = require("./../model/question.js");

exports.get = function(req, res){
  Question.find({},function(err, question ){
      if(err)handleError(err);
      if(!question) res.status(204).send('No Content');
      res.status(200).send(question);
  });
};

exports.post = function(req, res){
    var question = new Question(req.body);
    question.save(function(err, question ){
        if(err)handleError(err);
        res.status(201).send("Created");
    });
};
