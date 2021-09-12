import SecretConfig from "../config/interface/secret";

class SecretController {

    protected config: SecretConfig;

    public setConfig(config: SecretConfig) {
        this.config = config;
    }

    protected getConfig() : SecretConfig {
        return this.config;
    }

    protected throwInvalidRequest(response) {
        response.sendStatus(400);
    }

    protected throwError(response, err) {
        console.error(err);
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