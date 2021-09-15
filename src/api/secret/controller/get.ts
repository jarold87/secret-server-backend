import SecretController from "./secretController";
import SecretSchema from '../model/interface/secretSchema';

class GetSecret extends SecretController {

    public getSecret(request, response) : Promise<void> {
        if (this.isValidRequest(request) === false) {
            this.throwInvalidRequest(response);
            return Promise.resolve();
        }
        const hash = this.getGetParams(request)['hash'];
        return this.getSecretData(hash)
            .then((secret) => {
                if (secret === null) {
                    this.throwInvalidRequest(response);
                    return Promise.resolve();
                }
                response.send(secret);
                response.end();
                return Promise.resolve();
            })
            .catch((err) => {
                this.throwError(response, err);
                return Promise.resolve();
            });
    }

    protected isValidRequest(request) : boolean {
        const requiredHashLength = this.getConfig().validation.hashLength;
        const hash = this.getGetParams(request)['hash'];
        if (hash.length !== requiredHashLength) {
            return false;
        }
        return true;
    }

    protected getSecretData(hash: string): Promise<object> {
        return this.repository.getSecretByHash(hash)
            .then((secret: SecretSchema|null) => {
                if (secret === null) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({
                    hash: secret.hash,
                    secretText: secret.text,
                    createdAt: secret.createdAt,
                    expiresAt: secret.expireAt,
                    remainingViews: secret.remainingViews

                });
            });
    }
}

export default new GetSecret();