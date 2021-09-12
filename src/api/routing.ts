import Secret from "./secret/config/interface/secret";
import add from './secret/controller/add';
import get from './secret/controller/get';

class ApiRouting {

    public initRoutes(app, config: Secret) {

        add.setConfig(config);
        get.setConfig(config);

        app.post('/api/secret', add.addSecret.bind(add));
        app.get('/api/secret/:hash', get.getSecret.bind(get));

        return app;
    }

}

export default new ApiRouting();