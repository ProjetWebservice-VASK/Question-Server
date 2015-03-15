var express = require('express');
var router = express.Router();
var controller = require('./../controller/question.js');
var Question = require('./../model/question');
var Hal = require('./../lib/hal');

/**
 * Retrieve all the questions
 */
router.get('/', controller.get);

/**
 * Retrieving the question by ID
 */
router.get('/:id', controller.get);

/**
 * Creating the question
 */
router.post('/', controller.post);

router.get('/next', controller.get);


router.post('/1/received', controller.post);

/*router.put('/1/answer', function(req, res) {
    res.status(204);
});*/


module.exports = router;