import SecretSchema from "../model/interface/secretSchema";
import SecretModel from "../model/secretModel";
import MongoClient from "../../../mongo/client";
import {Document, Mongoose} from "mongoose";
import SecretConfig from "../config/interface/secret";

const secretConfig: SecretConfig = require('../config/secret.json');

class SecretRepository {

    protected client: typeof MongoClient;

    public setClient(client: typeof MongoClient) {
        this.client = client;
    }

    public count() : Promise<number> {
        return this.getConnection()
            .then(() => {
                return SecretModel.countDocuments();
            });
    }

    public getSecretByHash(hash: string) : Promise<SecretSchema|null> {
        return this.getConnection()
            .then(() => {
                const filter = {
                    hash: hash,
                    remainingViews: { $gt: 0 },
                    $or: [
                        { expireAt: 0 },
                        { expireAt: { $gt: new Date().getTime() }}
                    ]
                };
                const update = { $inc: { remainingViews: -1 }};
                const option = { new: true };
                return SecretModel.findOneAndUpdate(filter, update, option);
            });
    }

    public addSecret(data: SecretSchema) : Promise<Document> {
        return this.getConnection()
            .then(() => {
                const doc = new SecretModel(data);
                return doc.save();
            });
    }

    protected getConnection() : Promise<Mongoose> {
        return this.client.getAdminConnection(this.getDbName());
    }

    protected getDbName() : string {
        return secretConfig.databaseName;
    }

}

export default new SecretRepository();