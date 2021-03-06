import * as Sequelize from 'sequelize';
import { DateUtils } from '../../lib/utils/date-utils';

export default sequelize => {
    const Viruses = sequelize.define(
        'Viruses',
        {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                field: 'id',
            },
            source: { type: Sequelize.STRING(100), field: 'source' },
            longitude: { type: Sequelize.DOUBLE, field: 'longitude' },
            latitude: { type: Sequelize.DOUBLE, field: 'latitude' },
            region: { type: Sequelize.STRING(100), field: 'region' },
            country: { type: Sequelize.STRING(355), field: 'country' },
            admin1: { type: Sequelize.STRING(355), field: 'admin1' },
            localityName: {
                type: Sequelize.STRING(355),
                field: 'locality_name',
            },
            localityQuality: {
                type: Sequelize.STRING(355),
                field: 'locality_quality',
            },
            observationDate: {
                type: Sequelize.STRING(10),
                field: 'observation_date',
            },
            reportingDate: {
                type: Sequelize.STRING(10),
                field: 'reporting_date',
            },
            status: { type: Sequelize.STRING(50), field: 'status' },
            disease: { type: Sequelize.STRING(50), field: 'disease' },
            serotype: { type: Sequelize.STRING(100), field: 'serotype' },
            speciesDescription: {
                type: Sequelize.STRING(355),
                field: 'species_description',
            },
            sumAtRisk: { type: Sequelize.INTEGER, field: 'sum_at_risk' },
            sumCases: { type: Sequelize.INTEGER, field: 'sum_cases' },
            sumDeaths: { type: Sequelize.INTEGER, field: 'sum_deaths' },
            sumDestroyed: { type: Sequelize.INTEGER, field: 'sum_destroyed' },
            sumSlaughtered: {
                type: Sequelize.INTEGER,
                field: 'sum_slaughtered',
            },
            humansGenderDesc: {
                type: Sequelize.STRING(50),
                field: 'humans_gender_desc',
            },
            humanAge: { type: Sequelize.INTEGER, field: 'human_age' },
            humansAffected: {
                type: Sequelize.INTEGER,
                field: 'humans_affected',
            },
            humansDeath: { type: Sequelize.INTEGER, field: 'humans_deaths' },
            formattedObservationDate: {
                type: Sequelize.VIRTUAL,
                get() {
                    return DateUtils.getFormatedDate(this.observationDate);
                },
            },
            formattedReportingDate: {
                type: Sequelize.VIRTUAL,
                get() {
                    return DateUtils.getFormatedDate(this.reportingDate);
                },
            },
        },
        {
            tableName: 'viruses',
            timestamps: false,
        },
    );

    return Viruses;
};
