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
    type: types.SIGNED_OUT,
});

export const signIn = () => ({
    type: types.SIGN_IN,
});

export const signOut = () => ({
    type: types.SIGN_OUT,
});
