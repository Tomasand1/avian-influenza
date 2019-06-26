import * as Sequelize from 'sequelize';
import config from '../../config';

class DatabaseManager {
    init() {
        this.initDatabase();
        this.initModels();
    }

    initDatabase() {
        this.databases = {};
        const databaseData = config.databases;

        if (databaseData !== undefined) {
            for (const key in databaseData) {
                const databaseInfo = databaseData[key];
                try {
                    if ('mysql;postgres'.indexOf(databaseInfo.dialect) > -1) {
                        const sequelizeOptions = this._getSequelizeDatabaseConfig(
                            databaseInfo,
                        );
                        this.databases[key] = {
                            connection: new Sequelize(
                                databaseInfo.name,
                                databaseInfo.login,
                                databaseInfo.password,
                                sequelizeOptions,
                            ),
                            dialect: databaseInfo.dialect,
                            type: 'sequelize',
                        };
                    }
                } catch (err) {
                    console.log('database error: ' + err);
                }
            }
        }
    }

    _initModels() {
        // Models
        this.models = {};
        try {
            const pathModels = join(__dirname, '../../db/models/');
            if (!config.models) {
                return;
            }
            for (const modelInfo of config.models) {
                if (
                    !this.databases[modelInfo.database] ||
                    !this.databases[modelInfo.database].connection
                ) {
                    throw new Error(
                        `no database connection ${modelInfo.database}`,
                    );
                }
                try {
                    const database = this.databases[modelInfo.database];
                    const model = database.connection.import(
                        join(pathModels, `${modelInfo.id}.js`),
                    );
                    this.models[modelInfo.id] = model;
                    this._serializeModel(modelInfo.id, model);
                } catch (err) {
                    console.error(err);
                    this.logger.error(err.message);
                }
            }
        } catch (error) {
            this.logger.error(`initModels error ${error.message}`);
        }
    }

    _serializeModel(modelName, model) {
        // Add serialize instance method
        let options = {};
        try {
            options = require(join(
                __dirname,
                '../../db/serializer/' + modelName + '.js',
            )).default;
        } catch (err) {
            // no-op
        }
        model.prototype.serialize = factory(options);
    }

    _getSequelizeDatabaseConfig(databaseInfo) {
        const options = {
            dialect: databaseInfo.dialect || 'postgres',
            host: databaseInfo.host || 'localhost',
            operatorsAliases: false,
        };
        return ObjectUtils.deepMerge(options, databaseInfo.options || {});
    }

    getModel(modelName) {
        return this.models[modelName];
    }

    closeConnections() {
        Object.keys(this.databases).forEach(key => {
            const database = this.databases[key];
            if (database.type === 'sequelize') {
                database.connection.close();
            }
        });
    }

    getConnection(dbName) {
        if (this.databases[dbName]) {
            return this.databases[dbName].connection;
        } else {
            return null;
        }
    }
}

const databaseManager = new DatabaseManager();
export default databaseManager;
