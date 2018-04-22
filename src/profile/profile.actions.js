import * as types from './profile.types';

export const profileUpdate = (response, selectedTeamId) => ({
    type: types.UPDATE_PROFILE,
    response,
    selectedTeamId,
});

export const receiveProfile = (profiles) => ({
    type: types.RECEIVE_PROFILE,
    response: profiles[0],
});

export const receiveUserMatches = (response) => ({
    type: types.RECEIVE_MATCHES,
    response,
});
