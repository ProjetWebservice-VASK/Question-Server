describe('Request to the questions Path', function () {
    it('Should return a 201 status code', function (done) {
        request(app)
            .post('/questions/550bdccb976a9626037eb6c9/received')
            .expect(201)
            .end(function (error) {
                if(error) throw error;
                done();
            });
    });

    it('Should return a 204 status code for PUT request',function(done) {
        request(app)
            .put('/questions/550bdccb976a9626037eb6c9/answer')
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
});