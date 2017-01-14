import * as types from '../actions/profile.types';
import * as authTypes from '../actions/auth.types';

const matches = (state = [], action) => {
    switch (action.type) {
        case types.RECEIVE_MATCHES:
            return action.matches;
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
