var Question = require("./../model/question.js");
var Hal = require('./../lib/hal');

exports.get = function(req, res){
    if (req.params.id) {
        Question.findOne({ _id: req.params.id }, function(err, question) {
            if (err) {
                throw err;
            }

            var halObject = new Hal(question);

            res
                .status(200)
                .contentType('application/hal+json')
                .json(halObject.json);
        });
    } else {
        Question
            .find()
            .sort({ date: -1 })
            .exec(function(err, questions) {
            if (err) {
                throw err;
            }

            if (!questions) {
                res
                    .status(204)
                    .send();
            } else {
                var halObject = new Hal({ questions: questions });

                res
                    .status(200)
                    .contentType('application/hal+json')
                    .json(halObject.json);
            }
        });
    }
};

exports.post = function(req, res){
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

exports.put = function(req, res) {

};
