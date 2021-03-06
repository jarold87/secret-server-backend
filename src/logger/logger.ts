import winston = require("winston");
import {Logger} from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'secret-server-backend' },
    transports: [
        new winston.transports.Console({
            format: winston.format.prettyPrint({ colorize: true })
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

export function getLogger(): Logger {
    return logger;
}