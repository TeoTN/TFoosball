import * as types from './auth.types';
import { loadAuthState, removeAuthState } from '../persistence';

const auth = (state = loadAuthState('auth') || {}, action) => {
    switch (action.type) {
        case types.SET_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case types.SIGN_OUT:
            removeAuthState();
            return {};
        case types.SET_PROFILE:
            return {
                ...state,
                profile: action.response
            };
        default:
            return state;
    }
};
export default auth;