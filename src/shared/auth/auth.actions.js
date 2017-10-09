import * as types from './auth.types';

export const setToken = (token, expires_at) => ({
    type: types.SET_TOKEN,
    token,
    expires_at,
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

export const activateRequest = () => ({type: types.ACTIVATE_REQUEST});
export const activateSuccess = () => ({type: types.ACTIVATE_SUCCESS});
export const activateFailure = () => ({type: types.ACTIVATE_FAILURE});
