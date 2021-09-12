const expect = require("chai").expect;
const request = require("request");

const postDefaultOptions = {
    uri: 'http://localhost:3000/api/secret',
    method: 'POST',
    json: {
        "secret": "test",
        "expireAfterViews": 1,
        "expireAfter": 0
    }
};

const getUrl = 'http://localhost:3000/api/secret/';

context('Secret', function() {

    context('Add Secret', function() {

        it("response status 200", function(done) {
            request(postDefaultOptions, function (error, response) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("exist hash in response", function(done) {
            request(postDefaultOptions, function (error, response) {
                const keys = Object.keys(response.body);
                expect(keys.indexOf('hash')).to.equal(0);
                done();
            });
        });

        it("missing post parameters - response status 400", function(done) {
            let options = JSON.parse(JSON.stringify(postDefaultOptions));
            options.json = {};
            request(options, function (error, response) {
                const keys = Object.keys(response.body);
                expect(response.statusCode).to.equal(400);
                done();
            });
        });

        it("expiresAt calculation", function(done) {
            let options = JSON.parse(JSON.stringify(postDefaultOptions));
            options.json.expireAfter = 1;
            request(options, function (error, response) {
                const expireAt = response.body.expireAt;
                const myExpireAt = new Date().getTime() + 60 * 1000;
                expect(myExpireAt - expireAt).to.lessThan(1000);
                done();
            });
        });

    });

    context('Get Secret', function() {

        const hashes = {
            nonExisting: '6825e25f9da43fb980552d3c0bed28e8bb87c2f6',
            invalidLength: '123'
        };

        it("valid hash - response status 200", function(done) {
            request(postDefaultOptions, function (error, response) {
                const hash = response.body.hash;
                request(getUrl + hash, function(error, response) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });
            });
        });

        it("valid hash - secretText test", function(done) {
            request(postDefaultOptions, function (error, response) {
                const hash = response.body.hash;
                request(getUrl + hash, function(error, response) {
                    expect(JSON.parse(response.body).secretText).to.equal('test');
                    done();
                });
            });
        });

        it("non existing hash - response status 400", function(done) {
            request(getUrl + hashes.nonExisting, function(error, response) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        });

        it("invalid hash length - response status 400", function(done) {
            request(getUrl + hashes.invalidLength, function(error, response) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        });

        it("expiredByViews hash - response status 400", function(done) {
            let options = JSON.parse(JSON.stringify(postDefaultOptions));
            options.json.expireAfterViews = 0;
            request(options, function (error, response) {
                const hash = response.body.hash;
                request(getUrl + hash, function(error, response) {
                    expect(response.statusCode).to.equal(400);
                    done();
                });
            });
        });

    });

});