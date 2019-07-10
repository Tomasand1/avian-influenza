import { Router } from 'express';
import { ApiEnvelopeResponse } from '../responses/api-envelope-response';

export default class ApiRouter {
    constructor() {
        this.router = Router({
            caseSensitive: true,
            strict: true,
            mergeParams: true,
        });
    }

    init() {
        return this.router;
    }

    createResponse(res, apiResponse) {
        return res.status(apiResponse.code).json(apiResponse.getJson());
    }

    createSuccessResponse(req, res, data, message = null) {
        const apiResponse = new ApiEnvelopeResponse(200, data, null, message);
        this.createResponse(res, apiResponse);
    }
}
