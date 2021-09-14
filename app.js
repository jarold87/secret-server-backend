const args = process.argv.slice(2);
const port = 3000|args[0];

const express = require("express");
const app = express();
app.use(express.json());

const secretConfig = require('./dist/api/secret/config/secret.json');
const logger = require('./dist/logger/logger.js');

const ApiRouting = require('./dist/api/routing.js');
ApiRouting.default.initRoutes(app, secretConfig, logger);

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
