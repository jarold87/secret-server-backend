# Description #
- add new secret
- read a secret by hash

# Run #

**Node app**

    gulp && node app.js [?port]
    
**Unit Test**

    npm test

# Routes #

**[GET] /api/secret/:hash**

Response

    {
      "hash": "[The hash of the string]",
      "secretText": "[The original text]",
      "createdAt": "[The Timestamp the secret was created]",
      "expiresAt": "[The Timestamp the secret if TTL is given]",
      "remainingViews": 0
    }


**[POST] /api/secret**

JSON post data

    {
        "secret": "[This text that will be saved as a secret]",
        "expireAfterViews": "[The secret won't be available after the given number of views]",
        "expireAfter": "[The secret won't be available after the given time. The value is provided in minutes. 0 means never expires]"
    }

Response : Same as /api/secret/:hash

# Env vars #
- SOME_32BYTE_BASE64_STRING - Mongo encryptionKey
- SOME_64BYTE_BASE64_STRING - Mongo signingKey
- MONGO_HOST
- MONGO_PORT
- MONGO_DIALECT
- MONGO_USER
- MONGO_PASS
- MONGO_PARAMS - Mongo admin connection URL query params (e.g.: ?authSource=admin)

# TODO #
- docker fájl
- docker mongo nyitott portot megszuntetni