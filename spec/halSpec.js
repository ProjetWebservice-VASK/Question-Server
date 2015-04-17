describe('HAL', function() {
    var json = {
        name: 'Test object',
        booleanValue: true,
        arrayPart: [ 'hello', 'to', 'you' ]
    };

    it('can embed a JSON object', function(done) {
        var halObject = new Hal(json);

        var halJson = halObject.json;
        halJson.name.should.equal(json.name);
        halJson.booleanValue.should.equal(json.booleanValue);
        halJson.arrayPart.should.equal(json.arrayPart);

        done();
    });

    it('throws an exception when the object is null', function(done) {
        (function() {
            new Hal(null)
        }).should.throw('JSON object cannot be null');

        done();
    });

    it('can create links', function(done) {
        var URL_TO_THIS = '/links/to/this';
        var URL_TO_MORE = '/links/to/more';

        var halObject = new Hal(json);
        halObject.addLink('self', URL_TO_THIS);
        halObject.addLink('more', URL_TO_MORE);

        var halJson = halObject.json;
        halJson._links.self.should.equal(URL_TO_THIS);
        halJson._links.more.should.equal(URL_TO_MORE);

        done();
    });
});