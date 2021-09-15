import SecretController from "./secretController";
import SecretSchema from '../model/interface/secretSchema';
import {generateHash} from '../../../module/hashGenerator';

class AddSecret extends SecretController {

    public addSecret(request, response) : Promise<void> {
        if (this.isValidRequest(request) === false) {
            this.throwInvalidRequest(response);
            return Promise.resolve();
        }
        const params = this.getBodyParams(request);
        const data = this.createSecretData(params);
        return this.repository.addSecret(data)
            .then(() => {
                response.send(data);
                response.end();
                return Promise.resolve();
            })
            .catch((err) => {
                this.throwError(response, err);
                return Promise.resolve();
            });
    }

    protected isValidRequest(request) : boolean {
        const requiredParams = this.getConfig().validation.requiredBodyParams.add;
        const params = this.getBodyParams(request);
        for (let i = 0; i < requiredParams.length; i++) {
            if (Object.keys(params).indexOf(requiredParams[i]) < 0) {
                return false;
            }
        }
        return true;
    }

    protected createSecretData(params: object) : SecretSchema {
        const expireAfter = Number(params['expireAfter']) || 0;
        const expireAt = expireAfter ?
            new Date().getTime() + expireAfter * 60 * 1000 : 0;
        const remainingViews = Number(params['expireAfterViews']) || 0;
        return {
            hash: generateHash(),
            text: params['secret'],
            expireAfterInMin: expireAfter,
            remainingViews: remainingViews,
            createdAt: new Date().getTime(),
            expireAt: expireAt
        };
    }

}

export default new AddSecret();