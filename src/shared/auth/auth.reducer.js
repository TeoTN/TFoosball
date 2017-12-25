import * as types from './auth.types';
import { SETTINGS_SAVED } from '../../settings/settings.actions';

export const profile = (state = {}, action) => {
    switch (action.type) {
        case SETTINGS_SAVED:
            return Object.assign({}, state, action.values);
        case types.WHATS_NEW_SHOWN:
            return Object.assign({}, state, {whats_new_version: action.version});
        default:
            return state;
    }
};

export const activate = (state = {pending: true, success: false}, action = {}) => {
    switch (action.type) {
        case types.ACTIVATE_REQUEST:
            return {pending: true, success: false};
        case types.ACTIVATE_SUCCESS:
            return {pending: false, success: true};
        case types.ACTIVATE_FAILURE:
            return {pending: false, success: false};
        default:
            return state;
    }
};

export const auth = (state = {activate: activate()}, action) => {
    switch (action.type) {
        case types.SET_TOKEN:
            return {
                ...state,
                token: action.token,
                expires_at: action.expires_at,
            };
        case types.SIGNED_OUT:
            return {};
        case types.SET_PROFILE:
            return {
                ...state,
                profile: action.response
            };
        case SETTINGS_SAVED:
        case types.WHATS_NEW_SHOWN:
            return {
                ...state,
                profile: profile(state.profile, action),
            };
        case types.ACTIVATE_REQUEST:
        case types.ACTIVATE_SUCCESS:
        case types.ACTIVATE_FAILURE:
            return {
                ...state,
                activate: activate(state.activate, action),
            };
        default:
            return state;
    }
};

export default auth;
