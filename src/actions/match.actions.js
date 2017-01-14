import * as types from './match.types';

export const publish = (match_data, callback) => ({
    type: types.PUBLISH,
    match_data,
    callback
});

export const sent = (response) => ({
    type: types.SENT,
    response,
});
