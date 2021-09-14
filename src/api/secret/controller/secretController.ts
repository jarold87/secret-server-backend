import SecretConfig from "../config/interface/secret";
import {Logger} from "winston";
import SecretRepository from "../repository/secretRepository";

class SecretController {

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

    protected getConfig() : SecretConfig {
        return this.config;
    }

    protected throwInvalidRequest(response) {
        response.sendStatus(400);
    }

    protected throwError(response, err) {
        this.logger.log({
            level: 'error',
            message: err
        });
        response.sendStatus(500);
    }

    protected getBodyParams(request) : any[] {
        return request.body;
    }

    protected getGetParams(request) : object {
        return request.params;
    }
}

export default SecretController;