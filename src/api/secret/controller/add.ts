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
        const expireAt = Number(params['expireAfter']) ?
            new Date().getTime() + Number(params['expireAfter']) * 60 * 1000 : 0;
        return {
            hash: this.generateHash(),
            text: params['secret'],
            expireAfterInMin: Number(params['expireAfter']),
            remainingViews: Number(params['expireAfterViews']),
            createdAt: new Date().getTime(),
            expireAt: expireAt
        };
    }

    protected saveSecret(data: SecretSchema): Promise<any> {
        return SecretRepository.addSecret(data);
    }

    protected generateHash() : string {
        // TODO
        // return String(4567829 + new Date().getTime());

        const crypto = require('crypto');
        const current_date = (new Date()).valueOf().toString();
        const random = Math.random().toString();
        return crypto.createHash('sha1').update(current_date + random).digest('hex');
    }

}

export default new AddSecret();