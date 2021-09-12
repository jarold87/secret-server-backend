import {Schema, model} from "mongoose";
import SecretSchema from "./interface/secretSchema";

const encrypt = require('mongoose-encryption');
const encKey = process.env.SOME_32BYTE_BASE64_STRING || 'c+/oDniWakSS/H2PZmxLQb8VwC+xK0YWcXBCHJelY/4=';
const sigKey = process.env.SOME_64BYTE_BASE64_STRING || 'DXFwBQc6EiOVdbWKXDXyG8PaIHPCBzqlxL2EXGtaEZWQjsWSK/7RP/AhHM+X5Rrk4efieU4WvlNI6RqglAvXoA==';

const SecretSchema = new Schema<SecretSchema>({

    hash: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    text: {
        type: String,
        required: true
    },
    expireAfterInMin: {
        type: Number
    },
    remainingViews: {
        type: Number
    },
    createdAt: {
        type: Number,
        required: true
    },
    expireAt: {
        type: Number
    }

});
SecretSchema.plugin(encrypt, {
    encryptionKey: encKey, signingKey: sigKey, encryptedFields: ['text']
});
SecretSchema.set('autoIndex', false);
SecretSchema.index({ hash: 1 });

const SecretModel = model<SecretSchema>('Secret', SecretSchema);

export default SecretModel;