import * as types from './auth.types';

export const setToken = (token) => ({
    type: types.SET_TOKEN,
    token,
});

export const setProfile = (response) => ({
    type: types.SET_PROFILE,
    response,
});

export const signedOut = () => ({
    type: types.SIGN_OUT,
});
