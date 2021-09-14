import SecretConfig from "../config/interface/secret";
import {Logger} from "winston";

class SecretController {

    protected config: SecretConfig;
    protected logger: Logger;

    public setConfig(config: SecretConfig) {
        this.config = config;
    }

    public setLogger(logger: Logger) {
        this.logger = logger;
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