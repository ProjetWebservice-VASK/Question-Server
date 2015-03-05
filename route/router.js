var express = require('express');
var router = express.Router();
var controller = require('./../controller/question.js');
var Question = require('./../model/question');
var ObjectId = require('mongoose').Types.ObjectId;
var Hal = require('./../lib/hal');

router.get('/', function (req, res) {
    res.status(200).send("YEEEEEEEEAAAH !");
});

router.get('/next',controller.get);

router.get('/:id', function (req, res) {
    Question.findOne({ _id: new ObjectId(req.params.id) }, function(err, question) {
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

router.post('/1/received', controller.post);

/*router.put('/1/answer', function(req, res) {
    res.status(204);
});*/


module.exports = router;