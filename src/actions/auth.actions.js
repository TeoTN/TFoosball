import * as types from './auth.types';

export const setToken = (token) => ({
    type: types.SET_TOKEN,
    token
});

export const setUser = (user) => ({
    type: types.SET_USER,
    user
});

export const signOut = () => ({
    type: types.SIGN_OUT,
});
