import * as types from '../actions/auth.types';
import { loadAuthState } from '../persistence';

const auth = (state = loadAuthState('auth') || {}, action) => {
    switch (action.type) {
        case types.SET_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case types.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case types.SIGN_OUT:
            return {};
        default:
            return state;
    }
};
export default auth;