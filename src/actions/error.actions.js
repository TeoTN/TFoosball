import * as types from './error.types';

export const raiseError = (msg) => ({
    type: types.RAISE,
    msg: typeof msg === 'string' ? msg : msg.message,
});

export const handleError = (id) => ({
    type: types.HANDLE,
    id,
});