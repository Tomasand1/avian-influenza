import * as Sequelize from 'sequelize';

export default sequelize => {
    const Types = sequelize.define(
        'Types',
        {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'id',
            },
            disease: { type: Sequelize.STRING(100), field: 'disease' },
            serotype: { type: Sequelize.STRING(100), field: 'serotype' },
        },
        {
            tableName: 'types',
            timestamps: true,
            createdOn: 'created_on',
            updatedOn: 'updated_on',
        },
    );

    Types.associate = models => {
        Types.belongsTo(models.Viruses, {
            through: 'VirusType',
            sourceKey: 'id',
            foreignKey: 'type_id',
        });
        Types.hasMany(models.VirusTypes);
    };

    return Types;
};
