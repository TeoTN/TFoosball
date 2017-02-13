export const ensureJSON = (response) => response.json();
export const ensureSuccessOr = (errorMsg) =>
    (response) =>
        (response.status >= 200 && response.status < 300) ?
            Promise.resolve(response) :
            Promise.reject( new Error(errorMsg) );
export const checkIfForbiddenOr = (errorMsg) =>
    (response) =>
        (response.status !== 403) ?
            Promise.resolve(response) :
            Promise.reject( new Error(errorMsg) );
