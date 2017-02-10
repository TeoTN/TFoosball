import * as types from './profile.types';

export const profileUpdate = (response) => ({
    type: types.UPDATE,
    response,
});

export const receiveProfile = (response) => ({
    type: types.RECEIVE_PROFILE,
    response,
});

export const receiveUserMatches = (response) => ({
    type: types.RECEIVE_MATCHES,
    response,
});
