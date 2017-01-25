import * as types from '../actions/auth.types';
import { UPDATE } from '../actions/user.types'
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
        case UPDATE:
            if (action.id !== state.profile.id) return state;
            return {
                ...state,
                profile: Object.assign({}, state.profile, action.userData),
            };
        default:
            return state;
    }
};
export default auth;