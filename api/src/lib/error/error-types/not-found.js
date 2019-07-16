export default class NotFoundError extends Error {
    constructor(status = 404, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        }

        this.status = status;
    }
}
