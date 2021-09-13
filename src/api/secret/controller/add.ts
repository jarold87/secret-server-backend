import SecretController from "./secretController";
import SecretSchema from '../model/interface/secretSchema';
import SecretRepository from '../repository/secretRepository';

class AddSecret extends SecretController {

    public addSecret(request, response) {
        if (this.isValidRequest(request) === false) {
            this.throwInvalidRequest(response);
            return;
        }
        const params = this.getBodyParams(request);
        const data = this.createSecretData(params);
        this.saveSecret(data)
            .then(() => {
                response.send(data);
                response.end();
            })
            .catch((err) => {
                this.throwError(response, err);
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
            hash: this.generateHash(),
            text: params['secret'],
            expireAfterInMin: expireAfter,
            remainingViews: remainingViews,
            createdAt: new Date().getTime(),
            expireAt: expireAt
        };
    }

    protected saveSecret(data: SecretSchema): Promise<any> {
        return SecretRepository.addSecret(data);
    }

    protected generateHash() : string {
        const crypto = require('crypto');
        const current_date = (new Date()).valueOf().toString();
        const random = Math.random().toString();
        return crypto.createHash('sha1').update(current_date + random).digest('hex');
    }

}

export default new AddSecret();