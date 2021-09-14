const expect = require("chai").expect;
const hashGenerator = require('../dist/module/hashGenerator');
const config = require('../dist/api/secret/config/secret');

context('Hash Generator', function() {

    it("hash string type", function(done) {
        const hash = hashGenerator.generateHash();
        expect(typeof hash).to.equal('string');
        done();
    });

    it("hash length equals config value", function(done) {
        const hash = hashGenerator.generateHash();
        expect(hash.length).to.equal(config.validation.hashLength);
        done();
    });

});
