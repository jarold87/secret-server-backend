const args = process.argv.slice(2);
const port = 3000|args[0];

const express = require("express");
const app = express();
app.use(express.json());

const secretConfig = require('./dist/api/secret/config/secret.json');

const ApiRouting = require('./dist/api/routing.js');
ApiRouting.default.initRoutes(app, secretConfig);

app.get('/', (request, response) => {
    response.send('OK');
    response.end();
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
