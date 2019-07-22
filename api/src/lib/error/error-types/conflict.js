export default class ConflictError extends Error {
    constructor(status = 409, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ConflictError);
        }

        this.status = status;
    }
}
