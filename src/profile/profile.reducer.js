import * as types from './profile.types';
import * as authTypes from '../auth/auth.types';
import * as MatchTypes from '../matches/match.types';
import {defaultData} from '../matches/matches.reducer';

const matches = (state = defaultData, action) => {
    switch (action.type) {
        case types.RECEIVE_MATCHES:
            return {
                ...state,
                list: action.response.results,
                page: parseInt(action.response.page, 10),
                totalPages: Math.ceil(action.response.count / action.response.page_size),
                count: action.response.count,
            };
        case MatchTypes.DELETED:
            return {
                ...state,
                list: state.list.filter(match => match.id !== action.id),
                count: state.count - 1,
            };
        default:
            return state;
    }
};

export default (state = {}, action) => {
    switch (action.type) {
        case types.RECEIVE_PROFILE:
        case types.UPDATE_PROFILE:
            return Object.assign({}, state, action.response);
        case types.RECEIVE_MATCHES:
        case MatchTypes.DELETED:
            return {
                ...state,
                matches: matches(state.matches, action)
            };
        case authTypes.SIGN_OUT:
            return {};
        default:
            return state;
    }
}
