export default class UnauthorizedError extends Error {
    constructor(status = 401, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnauthorizedError);
        }

        this.status = status;
    }
}
