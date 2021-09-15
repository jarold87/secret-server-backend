const expect = require("chai").expect;

const mongoose = require('mongoose');
const server = require("mongodb-memory-server");
const MockReq = require('mock-express-request');
const MockRes = require('mock-express-response');

const config = require('../dist/api/secret/config/secret.json');
const loggerModule = require('../dist/logger/logger.js');
const logger = loggerModule.getLogger();
const repository = require('../dist/api/secret/repository/secretRepository').default;
const controller = require('../dist/api/secret/controller/get').default;
const client = require('../dist/mongo/client').default;
controller.setConfig(config);
controller.setLogger(logger);
controller.setRepository(repository);

context('Get Secret Controller test', function() {

    let mongoServer;
    let defaultRequestOption = {
        method: 'GET',
        url: '/api/secret/',
        params: {
            hash: ''
        }
    };

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

    it("Get secret - response status should 200", async () => {
        const secret = require("./fixtures/validSecret");
        const hash = secret.hash;
        const reqOption = JSON.parse(JSON.stringify(defaultRequestOption));
        reqOption.params.url += hash;
        reqOption.params.hash = hash;
        const req = new MockReq(reqOption);
        const res = new MockRes({ request: req });
        await repository.addSecret(secret);
        await controller.getSecret(req, res);
        expect(res.statusCode).to.equal(200);
    });

    it("Get secret by non existing hash - response status should 400", async () => {
        const hash = '47adcc6d9a1664682a85a314ddc9cc6a90d51f77';
        const reqOption = JSON.parse(JSON.stringify(defaultRequestOption));
        reqOption.params.url += hash;
        reqOption.params.hash = hash;
        const req = new MockReq(reqOption);
        const res = new MockRes({ request: req });
        await controller.getSecret(req, res);
        expect(res.statusCode).to.equal(400);
    });

    it("Get secret with wrong hash length - response status should 400", async () => {
        const hash = '1234';
        const reqOption = JSON.parse(JSON.stringify(defaultRequestOption));
        reqOption.params.url += hash;
        reqOption.params.hash = hash;
        const req = new MockReq(reqOption);
        const res = new MockRes({ request: req });
        await controller.getSecret(req, res);
        expect(res.statusCode).to.equal(400);
    });

    it("Get secret with expired (views) hash - response status should 400", async () => {
        const secret = require("./fixtures/expiredSecretByView");
        const hash = secret.hash;
        const reqOption = JSON.parse(JSON.stringify(defaultRequestOption));
        reqOption.params.url += hash;
        reqOption.params.hash = hash;
        const req = new MockReq(reqOption);
        const res = new MockRes({ request: req });
        await repository.addSecret(secret);
        await controller.getSecret(req, res);
        expect(res.statusCode).to.equal(400);
    });

    it("Get secret with expired (time) hash - response status should 400", async () => {
        const secret = require("./fixtures/expiredSecretByTime");
        const hash = secret.hash;
        const reqOption = JSON.parse(JSON.stringify(defaultRequestOption));
        reqOption.params.url += hash;
        reqOption.params.hash = hash;
        const req = new MockReq(reqOption);
        const res = new MockRes({ request: req });
        await repository.addSecret(secret);
        await controller.getSecret(req, res);
        expect(res.statusCode).to.equal(400);
    });

});