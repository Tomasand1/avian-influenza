import * as Sequelize from 'sequelize';

export default sequelize => {
    const VirusType = sequelize.define(
        'VirusType',
        {
            virusId: {
                type: Sequelize.STRING,
                primaryKey: true,
                references: {
                    model: 'Viruses',
                    key: 'id',
                },
                field: 'virus_id',
            },
            typeId: {
                type: Sequelize.STRING,
                primaryKey: true,
                references: {
                    model: 'Types',
                    key: 'id',
                },
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
        VirusType.belongsTo(models.Viruses, {
            sourceKey: 'virusId',
            foreignKey: 'id',
        });
    };

    return VirusType;
};
