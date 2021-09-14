import SecretConfig from "./secret/config/interface/secret";
import SecretRepository from './secret/repository/secretRepository';

import cors from './secret/middleware/cors';
import add from './secret/controller/add';
import get from './secret/controller/get';
import {Logger} from "winston";

class ApiRouting {

    protected config: SecretConfig;
    protected logger: Logger;
    protected repository: typeof SecretRepository;

    public setConfig(config: SecretConfig) {
        this.config = config;
    }

    public setLogger(logger: Logger) {
        this.logger = logger;
    }

    public setRepository(repository: typeof SecretRepository) {
        this.repository = repository;
    }

    public initRoutes(app) {

        add.setConfig(this.config);
        get.setConfig(this.config);
        add.setLogger(this.logger);
        get.setLogger(this.logger);
        add.setRepository(this.repository);
        get.setRepository(this.repository);

        app.use(cors.use);
        app.post('/api/secret', add.addSecret.bind(add));
        app.get('/api/secret/:hash', get.getSecret.bind(get));

        return app;
    }

}

export default new ApiRouting();