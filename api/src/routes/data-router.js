import ApiRouter from './_base/api-router';
import databaseManager from '../lib/managers/database-manager';
import { StringUtils } from '../lib/utils/string-utils';

export default class DataRouter extends ApiRouter {
    constructor() {
        super();
    }

    init() {
        const dataModel = databaseManager.getModel('viruses');

        this.router.get('/data', async (req, res) => {
            try {
                const query = req.query;

                const data = await dataModel.findAll({
                    where: {
                        ...query,
                    },
                });

                if (!data || data.length <= 0) {
                    return this.createErrorResponse(req, res, 404);
                }

                return this.createSuccessResponse(req, res, data);
            } catch (err) {
                return this.createErrorResponse(req, res, 400);
            }
        });

        this.router.post('/data', async (req, res) => {
            try {
                // TODO: Add validation
                const newID = StringUtils.getGuid();

                const data = {
                    id: newID,
                    disease: req.body.disease,
                    serotype: req.body.serotype,
                    status: req.body.status,
                    region: req.body.region,
                    country: req.body.country,
                    admin1: req.body.admin1,
                    locality_name: req.body.localityName,
                    locality_quality: req.body.localityQuality,
                    longitude: req.body.longitude,
                    latitude: req.body.latitude,
                    observation_date: req.body.observationDate,
                    reporting_date: req.body.reportingDate,
                    sum_at_risk: req.body.sumAtRisk,
                    sum_cases: req.body.sumCases,
                    sum_deaths: req.body.sumDeaths,
                    sum_destroyed: req.body.sumDestroyed,
                    sum_slaughtered: req.body.sumSlaughtered,
                    humans_gender_desc: req.body.humansGenderDesc,
                    human_age: req.body.humanAge,
                    humans_affected: req.body.humanAffected,
                    humans_deaths: req.body.humansDeaths,
                };

                const transaction = await databaseManager.getTransaction(
                    'avian-influenza',
                );
                const dataModel = await dataModel.create(data, { transaction });

                if (!dataModel) {
                    // TODO: handle error
                }

                await transaction.commit();

                return this.createSuccessResponse(
                    req,
                    res,
                    data,
                    'Data entry was successfully created',
                );
            } catch (err) {
                console.log(err);
            }
        });

        this.router.patch('/data/:id', async (req, res) => {
            // TODO: add validation
        });

        return this.router;
    }
}
