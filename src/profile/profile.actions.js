import * as types from './profile.types';

export const profileUpdate = (response) => ({
    type: types.UPDATE_PROFILE,
    response,
});

export const receiveProfile = (profiles) => ({
    type: types.RECEIVE_PROFILE,
    response: profiles[0],
});

export const receiveUserMatches = (response) => ({
    type: types.RECEIVE_MATCHES,
    response,
});
