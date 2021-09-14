const expect = require("chai").expect;
const request = require("request");
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.TEST_APP_PORT || 3000;

context('Server', function() {

    context('health check', function() {

        let url = "http://localhost:" + port + "/";

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
