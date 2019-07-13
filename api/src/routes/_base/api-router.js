import { Router } from 'express';
import { ApiEnvelopeResponse } from '../responses/api-envelope-response';
import ApiError from '../../lib/error/api-error';

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
        return res.status(apiResponse.status).json(apiResponse.getJson());
    }

    createSuccessResponse(req, res, data, message = null) {
        const apiResponse = new ApiEnvelopeResponse(200, data, null, message);
        this.createResponse(res, apiResponse);
    }

    createErrorResponse(req, res, status, error = null, message = null) {
        const errorObject = new ApiError(status);
        const apiResponse = new ApiEnvelopeResponse(
            status,
            null,
            errorObject,
            message,
        );
        this.createResponse(res, apiResponse);
    }
}
