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

    it("can be retrieved", function(done) {
        request(app)
            .get('/questions/' + question._id + '/')
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
});
