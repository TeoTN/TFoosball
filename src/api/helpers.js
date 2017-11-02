import {APIError, APIUnauthorizedError, APIForbiddenError} from '../errors';

export const retryOnError = (fn, errClass=Error) => fn().catch(error => {
    if (error.constructor === errClass) {
        return fn();
    }
    return Promise.reject(error);
});

const ignoreSyntax = (error) => error.constructor.name === 'SyntaxError' ? '' : error;
export const ensureJSON = (response) => response.json().catch(ignoreSyntax);

export const ensureSuccessOr = (errorMsg) =>
    (response) => {

        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else if (response.status === 403) {
            return response.json()
                .catch(ignoreSyntax)
                .then(responseBody => Promise.reject(new APIForbiddenError(errorMsg, responseBody)));
        } else if (response.status === 401) {
            return response.json()
                .catch(ignoreSyntax)
                .then(responseBody => Promise.reject(new APIUnauthorizedError(responseBody)));
        } else {
            return response.json()
                .catch(ignoreSyntax)
                .then(responseBody => Promise.reject(new APIError(errorMsg, responseBody)));
        }
    };
