import { TEAM_CREATED, SET_TEAMS, SELECT_TEAM } from './teams.actions';
import { UPDATE_PROFILE } from '../../profile/profile.types';
import { SIGNED_OUT } from '../auth.types';
export const getSelectedTeam = (state) => state.joined.find(team => team.id === state.selected);

export default (state = { joined: [], selected: 0 }, action) => {
    switch (action.type) {
        case TEAM_CREATED:
            return {
                ...state,
                joined: [action.team, ...state.joined],
            };
        case SET_TEAMS:
            return {
                ...state,
                joined: action.teams,
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
                    t => t.id !== state.selected ? t : Object.assign(t, {username: action.response.username})
                ),
            };
        case SIGNED_OUT:
            return { joined: [], selected: 0 };
        default:
            return state;
    }
}
