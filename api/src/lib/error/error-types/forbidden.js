export default class ForbiddenError extends Error {
    constructor(status = 403, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ForbiddenError);
        }

        this.status = status;
    }
}
