describe('Request to the questions Path', function () {

    var question,
        question_id,
        questionBis;

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

        question_id = question._id;
    });


    it('Should return a 204 status code', function (done) {
        request(app)
            .post('/questions/'+question_id+'/received')
            .expect(204)
            .end(function (error) {
                if(error) throw error;
                done();
            });
    });

    it('Should return a 204 status code for PUT request',function(done) {
        request(app)
            .put('/questions/'+question_id+'/answer')
            .send({ answer: 'Super answer' })
            .expect(204)
            .end(function (error) {
                if (error) throw error;
                done();
            });
    });

    it('Should return a 200 status code for GET request and NEXT',function(done) {
        request(app)
            .get('/questions/next')
            .expect(200)
            .end(function (error, res) {
                if (error) throw error;
                done();
            });
    });

    it('Should return a 409 status code for an already taken question', function(done) {
        question.processing = true;

        question.save(function (err) {
            if (err) {
                throw err;
            }
            done(err);
        });

        console.log(question.processing);

        request(app)
            .post('/questions/'+question_id+'/received')
            .expect(409)
            .end(function (error, res) {
                if (error) throw error;
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