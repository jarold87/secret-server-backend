import Secret from "./secret/config/interface/secret";
import cors from './secret/middleware/cors';
import add from './secret/controller/add';
import get from './secret/controller/get';
import {Logger} from "winston";

class ApiRouting {

    public initRoutes(app, config: Secret, logger: Logger) {

        add.setConfig(config);
        get.setConfig(config);
        add.setLogger(logger);
        get.setLogger(logger);

        app.use(cors.use);
        app.post('/api/secret', add.addSecret.bind(add));
        app.get('/api/secret/:hash', get.getSecret.bind(get));

        return app;
    }

}

export default new ApiRouting();