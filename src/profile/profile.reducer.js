import * as types from './profile.types';
import * as authTypes from '../shared/auth.types';
import * as MatchTypes from '../matches/match.types';

const matches = (state = { page: 1, totalPages: 1, list: [] }, action) => {
    switch (action.type) {
        case types.RECEIVE_MATCHES:
            return {
                ...state,
                list: action.response.results,
                page: parseInt(action.response.page, 10),
                totalPages: Math.ceil(action.response.count / action.response.page_size),
            };
        case MatchTypes.DELETED:
            return {
                ...state,
                list: state.list.filter(match => match.id !== action.id),
            };
        default:
            return state;
    }
};

export default (state = {}, action) => {
    switch (action.type) {
        case types.RECEIVE_PROFILE:
        case types.UPDATE:
            return Object.assign({}, state, action.response);
        case types.RECEIVE_MATCHES:
        case MatchTypes.DELETED:
            return {
                ...state,
                matches: matches(state.matches, action)
            };
        case authTypes.SIGN_OUT:
            return {};
        case types.SET_TEAMS:
            return {
                ...state,
                teams: action.teams,
            };
        default:
            return state;
    }
}
