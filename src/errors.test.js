import { APIError, APIForbiddenError, APIUnauthorizedError, APIValidationError } from "./errors";

describe('API Error', function() {
    const errorMsg1 = 'Failed';
    const errorMsg2 = 'An error occured';

    it('should parse message from response', function() {
        const response = {shouldDisplay: true, message: errorMsg2};
        const error = new APIError(errorMsg1, response);
        expect(error.message).toEqual(errorMsg2);
        expect(error.toDebugString()).toEqual(JSON.stringify(response, null, 2));
    });

    it('should NOT parse message from response', function() {
        const response = {shouldDisplay: false, message: errorMsg2};
        const error = new APIError(errorMsg1, response);
        expect(error.message).toEqual(errorMsg1);
        expect(error.toDebugString()).toEqual(JSON.stringify(response, null, 2));
    });

    it('should use message', function() {
        const error = new APIError(errorMsg1);
        expect(error.message).toEqual(errorMsg1);
    });
});

describe('APIUnauthorizedError', function() {
    const errorMsg1 = 'Session has expired.';
    const errorMsg2 = 'An error occured';

    it('should parse message from response', function() {
        const response = {shouldDisplay: true, message: errorMsg2};
        const error = new APIUnauthorizedError(response);
        expect(error.message).toEqual(errorMsg2);
        expect(error.toDebugString()).toEqual(JSON.stringify(response, null, 2));
    });

    it('should NOT parse message from response', function() {
        const response = {shouldDisplay: false, message: errorMsg2};
        const error = new APIUnauthorizedError(response);
        expect(error.message).toEqual(errorMsg1);
        expect(error.toDebugString()).toEqual(JSON.stringify(response, null, 2));
    });

    it('should use message', function() {
        const error = new APIUnauthorizedError();
        expect(error.message).toEqual(errorMsg1);
    });
});

describe('APIForbiddenError', function() {
    const errorMsg1 = 'Access denied';
    const errorMsg2 = 'An error occured';

    it('should parse message from response', function() {
        const response = {shouldDisplay: true, message: errorMsg2};
        const error = new APIForbiddenError(response);
        expect(error.message).toEqual(errorMsg2);
        expect(error.toDebugString()).toEqual(JSON.stringify(response, null, 2));
    });

    it('should NOT parse message from response', function() {
        const response = {shouldDisplay: false, message: errorMsg2};
        const error = new APIForbiddenError(response);
        expect(error.message).toEqual(errorMsg1);
        expect(error.toDebugString()).toEqual(JSON.stringify(response, null, 2));
    });

    it('should use message', function() {
        const error = new APIForbiddenError();
        expect(error.message).toEqual(errorMsg1);
    });
});

describe('APIValidationError', function() {
    const errorMsg1 = 'Failed to validate data';
    const errorMsg2 = 'some, errors';

    it('should NOT parse message from response', function() {
        const response = {non_field_errors: ['some', 'errors']};
        const error = new APIValidationError(response);
        expect(error.message).toEqual(errorMsg2);
        expect(error.toDebugString()).toEqual(JSON.stringify(response, null, 2));
    });

    it('should NOT parse message from response', function() {
        const response = {};
        const error = new APIValidationError(response);
        expect(error.message).toEqual(errorMsg1);
        expect(error.toDebugString()).toEqual(JSON.stringify(response, null, 2));
    });

    it('should use message', function() {
        const error = new APIValidationError();
        expect(error.message).toEqual(errorMsg1);
    });
});

