// TODO: import error definition

export class ApiEnvelopeResponse {
    constructor(code, data = null, error = null, message = null) {
        this.code = code;
        this.data = data;
        this.error = error;
    }

    getJson() {
        let response = {};
        if (this.error) {
            // TODO: create error
            response = {
                data: this.data,
                message: this.message,
                status: this.status,
                error: this.error,
            };
        } else {
            if (this.message === null) {
                this.message = 'Success';
            }

            response = {
                data: this.data,
                message: this.message,
                status: this.status,
                error: this.error,
            };
        }

        return response;
    }
}
