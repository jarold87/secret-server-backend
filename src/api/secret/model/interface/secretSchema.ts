interface SecretSchema {
    hash: string;
    text: string,
    expireAfterInMin: number;
    remainingViews: number;
    createdAt: number;
    expireAt: any
}

export default SecretSchema;