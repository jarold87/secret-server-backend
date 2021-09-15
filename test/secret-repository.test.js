const expect = require("chai").expect;
const repository = require('../dist/api/secret/repository/secretRepository').default;
const client = require('../dist/mongo/client').default;

const mongoose = require('mongoose');
const server = require("mongodb-memory-server");

context('Secret Repository test', function() {

    let mongoServer;

    beforeEach(async () => {
        mongoServer = await server.MongoMemoryServer.create();
        const mongoUrl = mongoServer.getUri();
        const connection = await mongoose.connect(mongoUrl);
        client.getAdminConnection = function () {
            return Promise.resolve(connection);
        };
        repository.setClient(client);
    });
    afterEach(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it("Add secret then count should 1", async () => {
        const secret = require("./fixtures/validSecret");
        await repository.addSecret(secret);
        const res = await repository.count();
        expect(res).to.equal(1);
    });

    it("Add secret hash and get secret hash should equal", async () => {
        const secret = require("./fixtures/validSecret");
        await repository.addSecret(secret);
        const res = await repository.getSecretByHash(secret.hash);
        expect(res.hash).to.equal(secret.hash);
    });

    it("Get non existing secret should null", async () => {
        const res = await repository.getSecretByHash('1234');
        expect(res).to.equal(null);
    });

    it("Get invalid secret (expired time) should null", async () => {
        const secret = require("./fixtures/expiredSecretByTime");
        await repository.addSecret(secret);
        const res = await repository.getSecretByHash(secret.hash);
        expect(res).to.equal(null);
    });

    it("Get invalid secret (expired by views) should null", async () => {
        const secret = require("./fixtures/expiredSecretByView");
        await repository.addSecret(secret);
        const res = await repository.getSecretByHash(secret.hash);
        expect(res).to.equal(null);
    });

});