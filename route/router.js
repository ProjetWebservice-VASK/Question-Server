var express = require('express');
var router = express.Router();
var controller = require('./../controller/question.js');
var Question = require('./../model/question');
var Hal = require('./../lib/hal');

router.get('/', function (req, res) {
    res.status(200).send("YEEEEEEEEAAAH !");
});

router.get('/next', controller.get);

router.get('/:id', controller.get);

router.post('/1/received', controller.post);

/*router.put('/1/answer', function(req, res) {
    res.status(204);
});*/


module.exports = router;