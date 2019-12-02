import * as config from '../../config/json/apiConfig.json';

export default class ApiError {
    constructor(status, message = null, fields = null) {
        this.fields = fields;
        this.code = this.getCode(status);
        this.message = this.getMessage(status, message);
    }

    getCode(status) {
        const code = config.errorCodes[status];
        if (!code) {
            return config.errorCodes['default'];
        }

        return code;
    }

    getMessage(status, message) {
        if (!message) {
            const defaultMessage = config.errorMessages[status];

            if (!defaultMessage) return config.errorMessages['default'];

            return defaultMessage;
        }

        return message;
    }

    createError() {
        const errorObject = {
            code: this.code,
            message: this.message,
            fields: this.fields,
        };

        return errorObject;
    }
}
