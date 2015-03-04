var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/question');

var question = new mongoose.Schema({
    question: 'string',
    answer: 'string',
    date: Date,
    processing: Boolean
});
var Question = mongoose.model('Question', question);
Question.save();

module.exports = Questions;