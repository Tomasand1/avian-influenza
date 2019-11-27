export default class BadRequestError extends Error {
    constructor(status = 400, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BadRequestError);
        }

        this.status = status;
    }
}
