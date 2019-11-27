import * as dotenv from 'dotenv';

/**
 * System configurations
 */

export default class Config {
    static getConfig() {
        dotenv.config();

        const config = {
            passwordSecert:
                process.env.PASSWORD_SECRET || '^D82hLL-GV@@zbqztJkEAbU',
            databases: {
                avian_influenza: {
                    dialect: process.env.DB_DIALECT || 'postgres',
                    host: process.env.DB_HOST || 'localhost',
                    login: process.env.DB_LOGIN || 'postgres',
                    name: process.env.DB_NAME || 'avian_influenza',
                    password: process.env.DB_PASSWORD || 'root',
                },
            },
        };

        return config;
    }
}
