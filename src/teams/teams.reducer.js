import {
    TEAM_CREATED,
    SET_TEAMS,
    SELECT_TEAM,
    PENDING_MEMBERS,
    TEAM_LEFT,
} from './teams.actions';
import { UPDATE_PROFILE } from '../profile/profile.types';
import { SIGNED_OUT } from '../shared/auth/auth.types';
import { createSelector } from "reselect";

const defaultState = {
    joined: [],
    selected: undefined,
    pending: [],
};

export const teams = (state = defaultState, action) => {
    switch (action.type) {
        case TEAM_CREATED:
            return {
                ...state,
                joined: [action.team, ...state.joined],
            };
        case SET_TEAMS:
            return {
                ...state,
                joined: action.teams || [],
                my_pending: action.my_pending || 0,
            };
        case SELECT_TEAM:
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
            return { joined: [], selected: 0, pending: [] };
        case PENDING_MEMBERS:
            return {
                ...state,
                pending: action.list,
            };
        case TEAM_LEFT:
            return {
                ...state,
                joined: state.joined.filter(t => t.id !== action.team.id),
            };
        default:
            return state;
    }
};

export default teams;

export const getTeamsState = state => state.teams || defaultState;
export const getSelectedTeam = createSelector(getTeamsState, teams => teams.joined.find(team => team.id === teams.selected));
