import * as types from './error.types';

export const raiseError = (msg) => ({
        type: types.RAISE,
        msg
});

export const handleError = (id) => ({
        type: types.HANDLE,
        id
});