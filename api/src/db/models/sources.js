import * as sequelize from 'sequelize';

export default sequelize => {
    const Sources = sequelize.define(
        'Sources',
        {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'id',
            },
            sourceName: { type: Sequelize.STRING(100), field: 'source_name' },
        },
        {
            tableName: 'sources',
            timestamps: true,
            createdOn: 'created_on',
            updatedOn: 'updated_on',
        },
    );

    return Sources;
};
