export const ensureJSON = (response) => response.json();
export const ensureSuccessOr = (errorMsg) =>
    (response) =>
        (response.status >= 200 && response.status < 300) ?
            Promise.resolve(response) :
            Promise.reject( new Error('Failed to connect to server.') );
