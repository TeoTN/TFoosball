import * as types from './auth.types';
import { STORE_ACTIVATION_CODE } from './auth.types';
import { SETTINGS_SAVED } from '../settings/settings.actions';
import { CHANGE_DEFAULT } from "../teams/teams.actions";

export const profile = (state = {}, action) => {
    // TODO Refactor to use camel-case
    switch (action.type) {
        case SETTINGS_SAVED:
            return Object.assign({}, state, action.values);
        case types.WHATS_NEW_SHOWN:
            return Object.assign({}, state, {whats_new_version: action.version});
        case CHANGE_DEFAULT:
            return Object.assign({}, state, {default_team: action.id});
        default:
            return state;
    }
};

const initialInvitationState = {
    activationCode: undefined,
};

export const invitation = (state = initialInvitationState, action = {}) => {
    switch (action.type) {
        case STORE_ACTIVATION_CODE:
            return { ...state, activationCode: action.code };
        default:
            return state;
    }
};

export const defaultAuthState = {
    invitation: invitation(),
    token: undefined,
    refreshToken: undefined,
    profile: {},
    expires_at: undefined, // TODO Rename to camel-case
};

export const auth = (state = defaultAuthState, action) => {
    switch (action.type) {
        case types.SET_TOKEN:
            return {
                ...state,
                token: action.token,
                expires_at: action.expires_at,
                refreshToken: action.refreshToken,
            };
        case types.SIGNED_OUT:
            return defaultAuthState;
        case types.SET_PROFILE:
            return {
                ...state,
                profile: action.response
            };
        case SETTINGS_SAVED:
        case types.WHATS_NEW_SHOWN:
        case CHANGE_DEFAULT:
            return {
                ...state,
                profile: profile(state.profile, action),
            };
        case types.STORE_ACTIVATION_CODE:
            return { ...state, invitation: invitation(state.invitation, action)};
        default:
            return state;
    }
};

export default auth;
