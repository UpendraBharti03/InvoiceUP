import * as process from 'process';
//@ts-ignore
import moduleAlias from "module-alias";
import path from 'path';
import dotenv from 'dotenv';

moduleAlias({
    base: path.join(__dirname, '../../')
})

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