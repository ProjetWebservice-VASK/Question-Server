var express = require('express');
var router = express.Router();
var controller = require('./../controller/question.js');
var Question = require('./../model/question');
var Hal = require('./../lib/hal');

/**
 * Retrieve all the questions
 */
router.get('/', controller.getAll);
router.get('/next', controller.get);
/**
 * Retrieving the question by ID
 */
router.get('/:id', controller.get);
/**
 * Creating the question
 */
router.post('/', controller.post);
router.post('/:id/received', controller.createQuestion);
router.put('/:id/answer',  controller.answerQuestion);


module.exports = router;