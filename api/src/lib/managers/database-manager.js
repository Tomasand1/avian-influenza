import Sequelize from 'sequelize';
import config from '../../config';
import { join } from 'path';

class DatabaseManager {
    async init() {
        await this.initDatabase();
        await this.initModels();
        // this.test();
        return this;
    }

    initDatabase() {
        const databaseInfo = config.databases;
        this.databases = {};
        for (const key in databaseInfo) {
            if (databaseInfo.hasOwnProperty(key)) {
                try {
                    this.databases[key] = {
                        connection: new Sequelize(
                            databaseInfo[key].name,
                            databaseInfo[key].login,
                            databaseInfo[key].password,
                            {
                                host: databaseInfo[key].host,
                                dialect: databaseInfo[key].dialect,
                            },
                        ),
                        dialect: databaseInfo[key].dialect,
                        type: 'sequelize',
                    };
                } catch (err) {
                    // TODO: handle error
                    console.log(`Failed to initialize database: ${err}`);
                }
            }
        }
    }

    initModels() {
        // Models
        this.models = {};
        try {
            const pathModels = join(__dirname, '../../db/models/');
            if (!config.models) {
                return;
            }
            const configModels = config.models[0];
            for (const modelInfo of configModels['default']) {
                console.log(this.databases[modelInfo.database]);
                if (
                    !this.databases[modelInfo.database] ||
                    !this.databases[modelInfo.database].connection
                ) {
                    throw new Error(
                        `Database was not initialized: ${modelInfo.database}`,
                    );
                }
                try {
                    console.log(this.databases);
                    const database = this.databases[modelInfo.database];
                    const model = database.connection.import(
                        join(pathModels, `${modelInfo.id}.js`),
                    );
                    this.models[modelInfo.id] = model;
                } catch (err) {
                    //TODO: handle error
                    console.error(err);
                }
            }
        } catch (err) {
            //TODO: handle error
            console.log(`Failed to initialize model: ${err}`);
        }
    }

    test() {
        this.databases['avian_influenza'].connection
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }

    closeDatabase() {
        sequelize.close();
    }
}

const databaseManager = new DatabaseManager();
export default databaseManager;
