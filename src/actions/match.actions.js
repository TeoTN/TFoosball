import * as types from './match.types';

export const send = (response) => ({
    type: types.SENT,
    response,
});
