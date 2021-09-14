export function generateHash(): string {
    const crypto = require('crypto');
    const current_date = (new Date()).valueOf().toString();
    const random = Math.random().toString();
    return crypto
        .createHash('sha1')
        .update(current_date + random)
        .digest('hex');
}