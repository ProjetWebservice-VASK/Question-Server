var express = require('express');
var router = express.Router();
var controler = require('./../controler/question.js');
var Question = require('./../model/question');
var Hal = require('./../lib/hal');

router.get('/', function (req, res) {
    res.status(200).send("YEEEEEEEEAAAH !");
});

router.get('/:id', function (req, res) {
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
});

router.post('/1/received', function(req, res) {
    res.status(204);
});

router.put('/1/answer', function(req, res) {
    res.status(204);
});


module.exports = router;