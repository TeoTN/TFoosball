import * as types from './profile.types';

export const profileUpdate = (response) => ({
    type: types.UPDATE,
    response
});

export const fetchProfile = (response) => ({
    type: types.FETCH_PROFILE,
    response
});
