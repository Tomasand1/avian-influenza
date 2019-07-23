import ApiRouter from './_base/api-router';
import databaseManager from '../lib/managers/database-manager';
import { StringUtils } from '../lib/utils/string-utils';
import NotFoundError from '../lib/error/error-types/not-found';
import BadRequestError from '../lib/error/error-types/bad-request';
import ConflictError from '../lib/error/error-types/conflict';

export default class BirdDataRouter extends ApiRouter {
    constructor() {
        super();
    }

    init() {
        this.dataModel = databaseManager.getModel('birds');

        this.router.get('/data', async (req, res) => {
            try {
                const query = req.query;

                const data = await this.dataModel.findAll({
                    where: {
                        ...query,
                    },
                });

                if (!data || data.length <= 0) {
                    throw new NotFoundError();
                }

                return this.createSuccessResponse(req, res, data);
            } catch (err) {
                console.log(err);
                if (err.name === 'SequelizeDatabaseError')
                    return this.createErrorResponse(
                        req,
                        res,
                        new BadRequestError(),
                    );

                return this.createErrorResponse(req, res, err);
            }
        });

        // this.router.post('/data', async (req, res) => {
        //     try {
        //         // TODO: Add validation
        //         const newID = StringUtils.getGuid();

        //         const data = {
        //             //id: newID,
        //             // TODO: Switch to UUID
        //             id: req.body.id,
        //             disease: req.body.disease,
        //             serotype: req.body.serotype,
        //             status: req.body.status,
        //             region: req.body.region,
        //             country: req.body.country,
        //             admin1: req.body.admin1,
        //             localityName: req.body.localityName,
        //             localityQuality: req.body.localityQuality,
        //             longitude: req.body.longitude,
        //             latitude: req.body.latitude,
        //             observationDate: req.body.observationDate,
        //             reportingDate: req.body.reportingDate,
        //             sumAtRisk: req.body.sumAtRisk,
        //             sumCases: req.body.sumCases,
        //             sumDeaths: req.body.sumDeaths,
        //             sumDestroyed: req.body.sumDestroyed,
        //             sumSlaughtered: req.body.sumSlaughtered,
        //             humansGenderDesc: req.body.humansGenderDesc,
        //             humanAge: req.body.humanAge,
        //             humansAffected: req.body.humanAffected,
        //             humansDeaths: req.body.humansDeaths,
        //         };

        //         const transaction = await databaseManager.getTransaction(
        //             'avian_influenza',
        //         );

        //         const model = await this.dataModel.create(data, {
        //             transaction,
        //         });

        //         if (!model) {
        //             throw new BadRequestError();
        //         }

        //         await transaction.commit();

        //         return this.createSuccessResponse(
        //             req,
        //             res,
        //             model,
        //             'Data entry was successfully created',
        //             201,
        //         );
        //     } catch (err) {
        //         if (err.errors[0].validatorKey === 'not_unique') {
        //             return this.createErrorResponse(
        //                 req,
        //                 res,
        //                 new ConflictError(),
        //             );
        //         }

        //         return this.createErrorResponse(req, res, err);
        //     }
        // });

        this.router.patch('/data/:id', async (req, res) => {
            try {
                // TODO: add validation

                const entry = await this.dataModel.findOne({
                    where: {
                        id: req.params.id,
                    },
                });

                if (!entry) {
                    throw new NotFoundError();
                }

                const updateData = req.body;

                const transaction = await databaseManager.getTransaction(
                    'avian_influenza',
                );

                const model = await entry.update(updateData, { transaction });

                if (!model) {
                    throw new BadRequestError();
                }

                await transaction.commit();

                return this.createSuccessResponse(
                    req,
                    res,
                    model,
                    'Data entry was successfully updated',
                );
            } catch (err) {
                if (err.name === 'SequelizeDatabaseError')
                    return this.createErrorResponse(
                        req,
                        res,
                        new BadRequestError(),
                    );

                return this.createErrorResponse(req, res, err);
            }
        });

        this.router.delete('/data/:id', async (req, res) => {
            // TODO: add validation
            try {
                const entry = await this.dataModel.findOne({
                    where: {
                        id: req.params.id,
                    },
                });

                if (!entry) {
                    throw new NotFoundError();
                }

                const transaction = await databaseManager.getTransaction(
                    'avian_influenza',
                );

                await entry.destroy();

                await transaction.commit();

                return this.createSuccessResponse(req, res, null, null, 204);
            } catch (err) {
                if (err.name === 'SequelizeDatabaseError') {
                    return this.createErrorResponse(
                        req,
                        res,
                        new BadRequestError(),
                    );
                }

                return this.createErrorResponse(req, res, err);
            }
        });

        return this.router;
    }
}
