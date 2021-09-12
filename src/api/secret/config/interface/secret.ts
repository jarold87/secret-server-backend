interface SecretConfig {
    "databaseName": string,
    "validation": {
        "requiredBodyParams": {
            add: string[]
        },
        "hashLength": number
    }
}

export default SecretConfig;
