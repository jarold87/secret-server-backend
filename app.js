const args = process.argv.slice(2);
const port = 3000|args[0];

const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();
app.use(express.json());

const secretConfig = require('./dist/api/secret/config/secret.json');
const loggerModule = require('./dist/logger/logger.js');
const logger = loggerModule.getLogger();
const secretRepository = require('./dist/api/secret/repository/secretRepository').default;
const routing = require('./dist/api/routing.js').default;

routing.setConfig(secretConfig);
routing.setLogger(logger);
routing.setRepository(secretRepository);
routing.initRoutes(app);

app.get('/', (request, response) => {
    response.send('OK');
    response.end();
});

app.listen(port, () => {
    logger.log({
        level: 'info',
        message: `app listening at http://localhost:${port}`
    });
});