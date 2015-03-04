var request = require('supertest');
var app = require('./../app');

describe('Request to the questions Path', function () {
    it("Should return a 200 status code",function(done){
        request(app)
            .get('/questions')
            .expect(200)
            .end(function (error) {
            if(error) throw error;
            done();
        });
    });

    it("Should return a 204 status code", function (done) {
        request(app)
            .post('/questions/1/received')
            .expect(204)
            .end(function (error) {
                if(error) throw error;
                done();
            });
    });

    it('Should return a 204 status code for PUT request',function(done){
            request(app)
                .put('/questions/1/answer')
                .expect(204)
                .end(function (error) {
                    if(error) throw error;
                    done();
                });
        }
    );
});
