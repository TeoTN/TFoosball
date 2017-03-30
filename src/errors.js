import ExtendableError from 'es6-error';

export class APIError extends ExtendableError {
    constructor(message, serverResponse) {
        super(message);
        this.serverResponse = serverResponse;
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
