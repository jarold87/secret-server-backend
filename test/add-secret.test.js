const expect = require("chai").expect;

const mongoose = require('mongoose');
const server = require("mongodb-memory-server");
const MockReq = require('mock-express-request');
const MockRes = require('mock-express-response');

const config = require('../dist/api/secret/config/secret.json');
const loggerModule = require('../dist/logger/logger.js');
const logger = loggerModule.getLogger();
const repository = require('../dist/api/secret/repository/secretRepository').default;
const controller = require('../dist/api/secret/controller/add').default;
const client = require('../dist/mongo/client').default;
controller.setConfig(config);
controller.setLogger(logger);
controller.setRepository(repository);

context('Add Secret Controller test', function() {

    let mongoServer;
    let defaultRequestOption = {
        method: 'POST',
        url: '/api/secret',
        body: {}
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

    it("Add secret - response status should 200", async () => {
        const secret = require("./fixtures/addSecretValidPostData");
        const reqOption = JSON.parse(JSON.stringify(defaultRequestOption));
        reqOption.body = secret;
        const req = new MockReq(reqOption);
        const res = new MockRes({ request: req });
        await controller.addSecret(req, res);
        expect(res.statusCode).to.equal(200);
    });

    it("Add secret with invalid post data - response status should 400", async () => {
        const secret = require("./fixtures/addSecretInValidPostData");
        const reqOption = JSON.parse(JSON.stringify(defaultRequestOption));
        reqOption.body = secret;
        const req = new MockReq(reqOption);
        const res = new MockRes({ request: req });
        await controller.addSecret(req, res);
        expect(res.statusCode).to.equal(400);
    });

});