import * as sequelize from 'sequelize';

export default sequelize => {
    const VirusSpecies = sequelize.define(
        'VirusSpecies',
        {
            virusId: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'virus_id',
            },
            speciesId: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'species_id',
            },
        },
        {
            tableName: 'virus_species',
            timestamps: false,
        },
    );

    VirusSpecies.associate = models => {
        VirusSpecies.belongsTo(models.Species, {
            sourceKey: 'speciesId',
            foreignKey: 'id',
        });
    };

    return VirusSpecies;
};
