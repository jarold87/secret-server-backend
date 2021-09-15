const expect = require("chai").expect;
const hashGeneratorTest = require('../dist/module/hashGenerator');
const config = require('../dist/api/secret/config/secret');

context('Hash Generator test', function() {

    it("hash string type should string", function(done) {
        const hash = hashGeneratorTest.generateHash();
        expect(typeof hash).to.equal('string');
        done();
    });

    it("hash length should config length value", function(done) {
        const hash = hashGeneratorTest.generateHash();
        expect(hash.length).to.equal(config.validation.hashLength);
        done();
    });

});
