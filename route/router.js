var express = require('express');
var router = express.Router();
var controller = require('./../controller/question.js');
var Question = require('./../model/question');
var Hal = require('./../lib/hal');

/**
 * Retrieve all the questions
 */
router.get('/', controller.getAllQuestions);
router.get('/next', controller.getQuestion);
/**
 * Retrieving the question by ID
 */
router.get('/:id', controller.getQuestion);
/**
 * Creating the question
 */
router.post('/', controller.createQuestion);
router.put('/:id/processing', controller.confirmQuestionReception);
router.put('/:id/answer',  controller.answerQuestion);


module.exports = router;