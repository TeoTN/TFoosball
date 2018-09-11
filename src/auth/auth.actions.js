import * as types from './auth.types';

export const setToken = (token, expires_at, refreshToken) => ({
    type: types.SET_TOKEN,
    token,
    expires_at,
    refreshToken,
});

export const setProfile = (response) => ({
    type: types.SET_PROFILE,
    response,
});

export const signedOut = () => ({
    type: types.SIGNED_OUT,
});

export const signIn = (payload) => ({
    type: types.SIGN_IN,
    payload,
});

export const invitationAuthorized = (payload) => ({
    type: types.INVITATION_AUTHORIZED,
    payload,
});

export const invitationCode = (code) => ({
    type: types.STORE_ACTIVATION_CODE,
    code,
});

export const invitationFinalize = () => ({ type: types.INVITATION_FINALIZE });

export const invitationSucceeded = ({teamName, username}) => ({
    type: types.INVITATION_SUCCEEDED,
    teamName,
    username,
});

export const signOut = () => ({
    type: types.SIGN_OUT,
});


export const whatsNewShown = (version) => ({ type: types.WHATS_NEW_SHOWN, version });
