import { TEAM_CREATED, SET_TEAMS } from './teams.actions';

export default (state = [], action) => {
    switch (action.type) {
        case TEAM_CREATED:
            return [action.team, ...state];
        case SET_TEAMS:
            return action.teams;
        default:
            return state;
    }
}
