import * as types from './profile.types';
import * as authTypes from '../shared/auth.types';
import * as MatchTypes from '../matches/match.types';

const matches = (state = [], action) => {
    switch (action.type) {
        case types.RECEIVE_MATCHES:
            return action.matches;
        case MatchTypes.DELETED:
            return state.filter(match => match.id !== action.id);
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
        default:
            return state;
    }
}
