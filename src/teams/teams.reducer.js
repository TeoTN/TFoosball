import * as fromTeams from './teams.actions';
import { UPDATE_PROFILE } from '../profile/profile.types';
import { SIGNED_OUT } from '../shared/auth/auth.types';
import { createSelector } from "reselect";

const defaultAutocompletion = {
    loading: false,
    teamNames: [],
};

const defaultState = {
    joined: [],
    selected: undefined,
    pending: [],
    autocompletion: defaultAutocompletion,
};

export function autocompletion(state = defaultAutocompletion, action) {
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

export const teams = (state = defaultState, action) => {
    switch (action.type) {
        case fromTeams.TEAM_CREATED:
            return {
                ...state,
                joined: [action.team, ...state.joined],
            };
        case fromTeams.SET_TEAMS:
            return {
                ...state,
                joined: action.teams || [],
                my_pending: action.my_pending || 0,
            };
        case fromTeams.SELECT_TEAM:
            return {
                ...state,
                selected: action.team.id,
            };
        case UPDATE_PROFILE:
            // On profile update
            if (!action.hasOwnProperty('response') || !action.response.hasOwnProperty('username')) {
                return state;
            }
            return {
                ...state,
                joined: state.joined.map(
                    t => t.id !== state.selected ? t : Object.assign({}, t, {username: action.response.username})
                ),
            };
        case SIGNED_OUT:
            return defaultState;
        case fromTeams.PENDING_MEMBERS:
            return {
                ...state,
                pending: action.list,
            };
        case fromTeams.TEAM_LEFT:
            return {
                ...state,
                joined: state.joined.filter(t => t.id !== action.team.id),
            };
        case fromTeams.FETCH_AUTOCOMPLETION:
        case fromTeams.RECEIVED_AUTOCOMPLETION:
            return {
                ...state,
                autocompletion: autocompletion(state.autocompletion, action),
            };
        default:
            return state;
    }
};

export default teams;

export const getTeamsState = state => state.teams || defaultState;
export const getSelectedTeam = createSelector(getTeamsState, teams => teams.joined.find(team => team.id === teams.selected));
export const getAutocompletionState = createSelector(getTeamsState, teams => teams.autocompletion);
