import * as process from 'process';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVars = process.env;

export const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL ?? '',
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationHours: envVars.JWT_ACCESS_TOKEN_EXPIRATION_HOURS,
    }
}