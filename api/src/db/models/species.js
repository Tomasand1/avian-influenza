import * as Sequelize from 'sequelize';

export default sequelize => {
    const Species = sequelize.define(
        'Species',
        {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'id',
            },
            speciesType: { type: Sequelize.STRING(100), field: 'species_type' },
            SpeciesName: { type: Sequelize.STRING(100), field: 'species_name' },
        },
        {
            tableName: 'species',
            timestamps: true,
            createdOn: 'created_on',
            updatedOn: 'updated_on',
        },
    );

    return Species;
};
