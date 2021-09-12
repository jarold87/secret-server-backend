import {connect, Mongoose} from 'mongoose';

const config = {
    "host": process.env.MONGO_HOST ? process.env.MONGO_HOST : "localhost",
    "port": process.env.MONGO_PORT ? process.env.MONGO_PORT : "27017",
    "dialect": process.env.MONGO_DIALECT ? process.env.MONGO_DIALECT : "mongo",
    "username": process.env.MONGO_USER ? process.env.MONGO_USER : "root",
    "password": process.env.MONGO_PASS ? process.env.MONGO_PASS : "password",
    "adminUrlParams": process.env.MONGO_PARAMS ? process.env.MONGO_PARAMS : "?authSource=admin&w=majority"
};

class MongoClient {

    public getAdminConnection(database: string): Promise<Mongoose> {
        const mongoUrl =
            'mongodb://' + config.username +
            ':' + config.password +
            '@' + config.host +
            ':' + config.port +
            '/' + database +
            config.adminUrlParams;
        return connect(mongoUrl);
    }

}

export default new MongoClient();