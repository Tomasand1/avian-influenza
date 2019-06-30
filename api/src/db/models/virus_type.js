import * as sequelize from 'sequelize';

export default sequelize => {
    const VirusType = sequelize.define(
        'VirusType',
        {
            virusId: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'virus_id',
            },
            typeId: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'type_id',
            },
        },
        {
            tableName: 'virus_type',
            timestamps: false,
        },
    );

    VirusType.associate = models => {
        VirusType.belongsTo(models.Types, {
            sourceKey: 'typeId',
            foreignKey: 'id',
        });
    };

    return VirusType;
};
