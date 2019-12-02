import ApiRouter from './_base/api-router';

export default class DefaultRouter extends ApiRouter {
    constructor() {
        super();
    }

    init() {
        this.router.get('/', (req, res) => {
            return res.status(200).json({
                data: 'success',
                message: 'success',
                status: 200,
                error: null,
            });
        });

        return this.router;
    }
}
