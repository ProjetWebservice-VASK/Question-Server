var express = require('express');
var router = express.Router();
var controler = require('./../controler/question.js');


router.get('/', function (req, res) {
    res.status(200).send("YEEEEEEEEAAAH !");
});

router.get('/1', function (req, res) {
    res.status(200).send("{ name: How do i brush my teeth, answer: with a stick}");
});

router.post('/1/received', function(req, res) {
    res.status(204);
});

router.put('/1/answer', function(req, res) {
    res.status(204);
});


module.exports = router;