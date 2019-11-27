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

    createSuccessResponse(req, res, data = null, message = null, status = 200) {
        const apiResponse = new ApiEnvelopeResponse(
            status,
            data,
            null,
            message,
        );
        this.createResponse(res, apiResponse);
    }

    createErrorResponse(req, res, error) {
        console.log(error);
        const errorObject = new ApiError(error.status);
        const apiResponse = new ApiEnvelopeResponse(
            error.status,
            null,
            errorObject,
            error.message,
        );
        this.createResponse(res, apiResponse);
    }
}
