import * as Sequelize from 'sequelize';

export default sequelize => {
    const Birds = sequelize.define(
        'Birds',
        {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                field: 'id',
            },
            globalUniqueId: {
                type: Sequelize.STRING(355),
                field: 'global_unique_id',
            },
            lastEditedDate: {
                type: Sequelize.STRING(100),
                field: 'last_edited_date',
            },
            taxonomicOrder: {
                type: Sequelize.INTEGER,
                field: 'taxonomic_order',
            },
            category: { type: Sequelize.STRING(10), field: 'category' },
            commonName: { type: Sequelize.STRING(100), field: 'common_name' },
            scientificName: {
                type: Sequelize.STRING(100),
                field: 'scientific_name',
            },
            subspeciesCommonName: {
                type: Sequelize.STRING(100),
                field: 'subspecies_common_name',
            },
            subspeciesScientificName: {
                type: Sequelize.STRING(100),
                field: 'subspecies_scientific_name',
            },
            observationCount: {
                type: Sequelize.STRING(10),
                field: 'observation_count',
            },
            breedingBirdAtlasCode: {
                type: Sequelize.STRING(50),
                field: 'breeding_bird_atlas_code',
            },
            breedingBirdAtlasCategory: {
                type: Sequelize.STRING(100),
                field: 'breeding_bird_atlas_category',
            },
            ageSex: { type: Sequelize.STRING(100), field: 'age_sex' },
            country: { type: Sequelize.STRING(355), field: 'country' },
            countryCode: {
                type: Sequelize.STRING(10),
                field: 'country_code',
            },
            state: { type: Sequelize.STRING(100), field: 'state' },
            stateCode: { type: Sequelize.STRING(10), field: 'state_code' },
            county: { type: Sequelize.STRING(100), field: 'county' },
            countyCode: { type: Sequelize.STRING(10), field: 'county_code' },
            ibaCode: {
                type: Sequelize.STRING(50),
                field: 'iba_code',
            },
            bcrCode: {
                type: Sequelize.STRING(50),
                field: 'bcr_code',
            },
            usfwsCode: {
                type: Sequelize.STRING(50),
                field: 'usfws_code',
            },
            atlasBlock: {
                type: Sequelize.STRING(50),
                field: 'atlas_block',
            },
            locality: { type: Sequelize.STRING(200), field: 'locality' },
            localityId: {
                type: Sequelize.STRING(50),
                field: 'locality_id',
            },
            localityType: {
                type: Sequelize.STRING(10),
                field: 'locality_type',
            },
            latitude: {
                type: Sequelize.DOUBLE,
                field: 'latitude',
            },
            longitude: {
                type: Sequelize.DOUBLE,
                field: 'longitude',
            },
            observationDate: {
                type: Sequelize.STRING(50),
                field: 'observation_date',
            },
            timeObservationsStarted: {
                type: Sequelize.STRING(50),
                field: 'time_observations_started',
            },
            observerId: {
                type: Sequelize.STRING(50),
                field: 'observer_id',
            },
            samplingEventIdentifier: {
                type: Sequelize.STRING(50),
                field: 'sampling_event_identifier',
            },
            protocolType: {
                type: Sequelize.STRING(50),
                field: 'protocol_type',
            },
            protocolCode: {
                type: Sequelize.STRING(50),
                field: 'protocol_code',
            },
            projectCode: {
                type: Sequelize.STRING(50),
                field: 'project_code',
            },
            duration: {
                type: Sequelize.INTEGER,
                field: 'duration',
            },
            effortDistance: {
                type: Sequelize.DOUBLE,
                field: 'effort_distance',
            },
            effortArea: {
                type: Sequelize.DOUBLE,
                field: 'effort_area',
            },
            numberObservers: {
                type: Sequelize.INTEGER,
                field: 'number_observers',
            },
            allSpeciesReported: {
                type: Sequelize.BOOLEAN,
                field: 'all_species_reported',
            },
            groupIdentifier: {
                type: Sequelize.STRING(50),
                field: 'group_identifier',
            },
            media: {
                type: Sequelize.BOOLEAN,
                field: 'media',
            },
            approved: {
                type: Sequelize.BOOLEAN,
                field: 'approved',
            },
            reviewed: {
                type: Sequelize.BOOLEAN,
                field: 'reviewed',
            },
            reason: {
                type: Sequelize.STRING(355),
                field: 'reason',
            },
            tripComments: {
                type: Sequelize.STRING,
                field: 'trip_comments',
            },
            speciesComments: {
                type: Sequelize.STRING,
                field: 'species_comments',
            },
        },
        {
            tableName: 'bird_point_data',
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: 'updated_on',
        },
    );

    return Birds;
};
