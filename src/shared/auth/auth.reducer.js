import * as types from './auth.types';
import { SETTINGS_SAVED } from '../../settings/settings.actions';
import { createSelector } from "reselect";
import { CHANGE_DEFAULT } from "../../teams/teams.actions";

export const profile = (state = {}, action) => {
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

const defaultAuthState = {
    activate: activate(),
    token: undefined
};

export const auth = (state = defaultAuthState, action) => {
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
        case CHANGE_DEFAULT:
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

export const getAuthState = state => state.auth  || defaultAuthState;
export const getAuthProfile = createSelector(getAuthState, state => state.profile);
export const getDefaultTeam = createSelector(getAuthProfile, profile => profile.default_team);
export const isTeamAdmin = createSelector(getAuthProfile, profile => profile && profile.is_team_admin);
export const getToken = createSelector(getAuthState, state => state.token);
export default auth;
