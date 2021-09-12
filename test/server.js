const expect = require("chai").expect;
const request = require("request");

context('Server', function() {

    context('health check', function() {

        let url = "http://localhost:3000/";

        it("response status 200", function(done) {
            request(url, function(error, response) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("response body OK", function(done) {
            request(url, function(error, response) {
                expect(response.body).to.equal('OK');
                done();
            });
        });

    });

});
