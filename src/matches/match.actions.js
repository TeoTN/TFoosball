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

export const remove = (id) => ({
    type: types.DELETE,
    id
});

export const removed = (id) => ({
    type: types.DELETED,
    id
});

export const list = (response) => ({
    type: types.LIST,
    response,
});
