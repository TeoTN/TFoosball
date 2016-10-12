import * as types from '../actions/auth.types';
import { loadAuthState, removeAuthState, saveAuthState } from '../persistence';

const auth = (state = loadAuthState('auth') || {}, action) => {
    switch (action.type) {
        case types.SET_TOKEN:
            location.reload(); //TODO
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
            removeAuthState();
            location.reload(); //TODO
            return {};
        default:
            return state;
    }
};
export default auth;