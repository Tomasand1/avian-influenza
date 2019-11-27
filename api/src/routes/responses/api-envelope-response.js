import * as config from '../../config/json/apiConfig.json';

export class ApiEnvelopeResponse {
    constructor(status, data = null, error = null, message = null) {
        this.status = status;
        this.data = data;
        this.error = error;
        this.message = message;
    }

    getJson() {
        let response = {};
        if (this.error) {
            if (this.message === null) {
                this.message = config.responseMessages['error'];
            }
            response = {
                data: this.data,
                message: this.message,
                status: this.status,
                error: this.error,
            };
        } else {
            if (this.message === null) {
                const message = config.responseMessages[this.status];
                if (!message) {
                    this.message = config.responseMessages['defaultSuccess'];
                } else {
                    this.message = message;
                }
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
