import * as Sequelize from 'sequelize';

export default sequelize => {
    const VirusSources = sequelize.define(
        'VirusSources',
        {
            virusId: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'virus_id',
            },
            sourceId: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'source_id',
            },
        },
        {
            tableName: 'virus_sources',
            timestamps: false,
        },
    );

    VirusSources.associate = models => {
        VirusSources.belongsTo(models.Sources, {
            sourceKey: 'sourceId',
            foreignKey: 'id',
        });
    };

    return VirusSources;
};
