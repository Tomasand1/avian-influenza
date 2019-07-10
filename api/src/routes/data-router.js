import ApiRouter from './_base/api-router';
import databaseManager from '../lib/managers/database-manager';

export default class DataRouter extends ApiRouter {
    constructor() {
        super();
    }

    init() {
        const dataModel = databaseManager.getModel('viruses');

        this.router.get('/data', async (req, res) => {
            try {
                const query = req.query.conditions;
                let data = {};
                if (query) {
                    data = await dataModel.findAll({
                        where: {
                            query,
                        },
                    });
                } else {
                    data = await dataModel.findAll();
                }

                // TODO: create default message objects
                return this.createSuccessResponse(
                    req,
                    res,
                    data,
                    'Data has been retrieved successfully',
                );
            } catch (err) {
                // TODO: change to error response
                console.log(err);
            }
        });

        // post
        // patch

        return this.router;
    }
}
