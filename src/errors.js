import ExtendableError from 'es6-error';

export class APIError extends ExtendableError {
    constructor(message, response) {
        const msg = response && response.shouldDisplay ? response.message : message;
        super(msg);
        this.serverResponse = response;
    }

    toDebugString() {
        return JSON.stringify(this.serverResponse, null, 2);
    }
}

export class APIUnauthorizedError extends APIError {
    constructor(serverResponse) {
        super('Session has expired.', serverResponse);
    }
}

export class APIForbiddenError extends APIError {
    constructor(serverResponse) {
        super('Access denied', serverResponse);
    }
}


export class APIValidationError extends ExtendableError {
    constructor(serverResponse) {
        if (serverResponse && serverResponse.hasOwnProperty('non_field_errors')) {
            super(serverResponse.non_field_errors.join(', '));
        } else {
            super('Failed to validate data');
        }
        this.serverResponse = serverResponse;
    }

    toDebugString() {
        return JSON.stringify(this.serverResponse, null, 2);
    }
}
