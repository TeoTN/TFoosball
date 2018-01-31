import * as fromTeams from './teams.actions';
import { UPDATE_PROFILE } from '../profile/profile.types';
import { createSelector } from "reselect";
import { combineReducers } from "redux";
import { SIGNED_OUT } from "../shared/auth/auth.types";

const defaultAutocompletion = {
    loading: false,
    teamNames: [],
};

export function autocompletion(state = defaultAutocompletion, action={}) {
    switch (action.type) {
        case fromTeams.FETCH_AUTOCOMPLETION:
            return {
                ...state,
                loading: true,
                teamNames: defaultAutocompletion.teamNames
            };
        case fromTeams.RECEIVED_AUTOCOMPLETION:
            return {
                ...state,
                loading: false,
                teamNames: action.teamNames
            };
        default:
            return state;
    }
}

export const joined = (state = [], action={}) => {
    switch (action.type) {
        case fromTeams.TEAM_CREATED:
            return [action.team, ...state];
        case fromTeams.SET_TEAMS:
            return action.teams || [];
        case UPDATE_PROFILE:
            if (!action.response || !action.response.hasOwnProperty('username')) {
                return state;
            }
            return state.map(
                t => t.id !== action.selectedTeamId ? t : Object.assign({}, t, {username: action.response.username})
            );
        case fromTeams.TEAM_LEFT:
            return state.filter(t => t.id !== action.team.id);
        case SIGNED_OUT:
            return [];
        default:
            return state;
    }
};

export const defaultMetaState = {
    myPending: 0,
    selected: undefined,
    pending: [],
    defaultTeam: undefined,
};

export const meta = (state = defaultMetaState, action={}) => {
    switch (action.type) {
        case fromTeams.SET_MY_PENDING:
            return {
                ...state,
                myPending: action.count,
            };
        case fromTeams.SET_TEAMS:
            return {
                ...state,
                myPending: action.myPending || 0,
                defaultTeam: action.defaultTeam,
            };
        case fromTeams.SELECT_TEAM:
            return {
                ...state,
                selected: action.team.id,
            };
        case fromTeams.PENDING_MEMBERS:
            return {
                ...state,
                pending: action.list,
            };
        case fromTeams.CHANGE_DEFAULT:
            return {
                ...state,
                defaultTeam: action.id,
            };
        case SIGNED_OUT:
            return defaultMetaState;
        default:
            return state;
    }
};


const defaultEventsState = {
    list: [],
    loading: true,
    error: undefined,
};

export const events = (state = defaultEventsState, action={}) => {
    switch (action.type) {
        case fromTeams.FETCH_EVENTS:
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case fromTeams.FETCHED_EVENTS:
            return {
                loading: false,
                error: undefined,
                list: action.response,
            };
        case fromTeams.ERROR_EVENTS:
            return {
                loading: false,
                error: action.error,
                list: [],
            };
        case SIGNED_OUT:
            return defaultEventsState;
        default:
            return state;
    }
};

export const teams = combineReducers({
    joined,
    autocompletion,
    meta,
    events,
});

export default teams;

export const getTeamsState = state => state.teams;
export const getJoinedTeams = createSelector(getTeamsState, state => state.joined);
export const getTeamsMetadata = createSelector(getTeamsState, state => state.meta);
export const getEventsState = createSelector(getTeamsState, state => state.events);
export const getAutocompletionState = createSelector(getTeamsState, teams => teams.autocompletion);
export const getMyRequestsPending = createSelector(getTeamsMetadata, state => state.myPending);
export const getSelectedTeamId = createSelector(getTeamsMetadata, state => state.selected);
export const getDefaultTeamId = createSelector(getTeamsMetadata, state => state.defaultTeam);
export const getSelectedTeam = createSelector(
    [getJoinedTeams, getSelectedTeamId],
    (joined, selected) => joined.find(team => team.id === selected) || {}
);
export const getTeamPending = createSelector(getTeamsMetadata, state => state.pending);
export const getTeamBasics = createSelector(
    [getJoinedTeams, getDefaultTeamId, getSelectedTeam],
    (joinedTeams, defaultTeamId, selectedTeam) => ({
        joinedTeams, defaultTeamId, selectedTeam,
    })
);
