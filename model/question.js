var mongoose = require('mongoose');

var Question = new mongoose.Schema({
    question: 'string',
    answer: 'string',
    date: Date,
    processing: Boolean
});

var Question = mongoose.model('Question', Question);

module.exports = Question;