import * as types from './infobar.types';

export const displayInfo = (msg) => ({
    type: types.DISPLAY,
    msg,
});

export const handleMsg = (id) => ({
    type: types.HANDLE,
    id,
});