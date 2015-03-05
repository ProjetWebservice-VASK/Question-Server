describe('A Question', function () {
    var question;

    beforeEach(function(done) {
        // Empty the database
        Question.remove(function(err) {
            if (err) {
                throw err;
            }
        });

        // Create a test question
        question = new Question();
        question.question = chance.sentence();
        question.date = chance.date();
        question.processing = false;

        // Persist the question
        question.save(function(err) {
            if (err) {
                throw err;
            }

            done(err);
        })
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

                var json = JSON.parse(res.text);

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
});
