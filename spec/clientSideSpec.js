describe('A Question', function () {
    var question;

    beforeEach(function(done) {
        // Empty the database
        Question.remove(function(err) {
            if (err) {
                throw err;
            }
        });

        question = createQuestion();

        // Persist the question
        question.save(function (err) {
            if (err) {
                throw err;
            }

            done(err);
        });
    });

    it('list can be retrieved ordered by descending date', function(done) {
        var additionalQuestions = [];

        // Create multiple questions
        for (var questionIndex = 0; questionIndex < 4; questionIndex++) {
            additionalQuestions.push(createQuestion());
        }

        // Persist the questions
        async.each(additionalQuestions, function(question, callback) {
            question.save(function (err) {
                if (err) {
                    throw err;
                }

                callback(err);
            });
        }, function(err) {
            if (err) {
                throw err;
            }

            // Add the initial question to the additional questions
            additionalQuestions.push(question);

            // Sort the questions
            additionalQuestions.sort(function(question1, question2) {
                if (question1.date > question2.date) {
                    return -1;
                } else if (question1.date == question2.date) {
                    return 0;
                } else {
                    return 1;
                }
            });

            request(app)
                .get('/questions')
                .expect(200)
                .expect('Content-Type', /application\/hal\+json/)
                .end(function (error, res) {
                    if(error) {
                        throw error;
                    }

                    var json = JSON.parse(res.text);

                    var jsonQuestions = json.questions;
                    for (var questionIndex = 0; questionIndex < 5; questionIndex++) {
                        var jsonQuestion = jsonQuestions[questionIndex];
                        var additionalQuestion = additionalQuestions[questionIndex];

                        jsonQuestion.question.should.equal(additionalQuestion.question);
                        jsonQuestion.date.should.equal(additionalQuestion.date.toISOString());
                        jsonQuestion.processing.should.equal(additionalQuestion.processing);
                    }

                    done(error);
                });
        });
    });

    it('can be retrieved', function(done) {
        request(app)
            .get('/questions/' + question._id)
            .expect(200)
            .expect('Content-Type', /application\/hal\+json/)
            .end(function (error, res) {
                if(error) {
                    throw error;
                }

                var json = JSON.parse(res.text).question;

                json.question.should.equal(question.question);
                json.date.should.equal(question.date.toISOString());
                json.processing.should.equal(question.processing);

                done(error);
            });
    });

    it('can be created', function(done) {
        var newQuestion = new Question();
        newQuestion.question = chance.sentence();
        newQuestion.date = chance.date();
        newQuestion.processing = false;

        request(app)
            .post('/questions')
            .expect(201)
            .send(newQuestion)
            .end(function (error, res) {
                if(error) {
                    throw error;
                    done(error);
                }

                Question.findOne({
                    question: newQuestion.question,
                    date: newQuestion.date,
                    processing: newQuestion.processing
                }, function(err, savedQuestion) {
                    res.headers.location.should.equal('/questions/' + savedQuestion._id);

                    done(error);
                });
            });
    });

    function createQuestion(callback) {
        // Create a test question
        var newQuestion = new Question();
        newQuestion.question = chance.sentence();
        newQuestion.date = chance.date();
        newQuestion.processing = false;

        return newQuestion;
    }
});
