var Question = require("./../model/question.js");
var Hal = require('./../lib/hal');

exports.getQuestion = function(req, res){
    if (req.params.id) {
        Question.findOne({ _id: req.params.id }, function(err, question) {
            if (err) {
                throw err;
            }

            var halObject = new Hal({ question: question });

            halObject.addLink('received',req.baseUrl + '/' + question._id + '/received');
            halObject.addLink('answer',req.baseUrl + '/' + question._id + '/answer');

            res
                .status(200)
                .contentType('application/hal+json')
                .json(halObject.json);
        });
    } else {
        Question
            .findOne()
            .sort({ date: 1 })
            .exec(function(err, question) {
            if (err) {
                throw err;
            }

            if (!question) {
                res
                    .status(204)
                    .send();
            } else {
                var halObject = new Hal({ question: question });

                halObject.addLink('received', req.baseUrl + '/' + question._id + '/received');
                halObject.addLink('answer', req.baseUrl + '/' + question._id + '/answer');

                res
                    .status(200)
                    .contentType('application/hal+json')
                    .json(halObject.json);
            }
        });
    }
};

exports.getAllQuestions = function(req, res) {
    Question
        .find()
        .sort({date: -1})
        .exec(function (err, questions) {
            if (err) {
                throw err;
            }

            if (questions.length <1) {
                res
                    .status(204)
                    .send();
            } else {
                var halObject = new Hal({questions: questions});

                res
                    .status(200)
                    .contentType('application/hal+json')
                    .json(halObject.json);
            }
        });
    ;
};

exports.createQuestion = function(req, res) {
    var question = new Question(req.body);

    question.save(function(err){
        if(err) {
            throw err;
        }

        res
            .status(201)
            .location(req.baseUrl + '/' + question._id)
            .send();
    });
};

exports.confirmQuestionReception = function(req, res){
    Question.findById(req.params.id, function (err, question) {
        if(err) throw err;
        if(!question) res.status(404).send('Well tried !');

        question.processing = true;

        res
            .status(204)
            .location(req.baseUrl + '/' + question._id + '/received')
            .send();
    });
};

exports.answerQuestion = function(req, res) {
    Question.findById(req.params.id, function (err, question) {
        if(err) throw err;
        if(!question) res.status(404).send('This question does not exist MOFO !');

        console.log('question asked : '+question);
        question.answer = req.body.answer;

        res.status(204)
            .location(req.baseUrl + '/' + question._id + '/answer')
            .send();
    });
    //
    //question.save(function (err) {
    //    if(err) throw err;
    //
    //    res.status(204)
    //        .location(req.baseUrl + '/' + question._id)
    //        .send();
    //});
};
