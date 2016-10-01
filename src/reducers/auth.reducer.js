import * as types from '../actions/auth.types';

const auth = (state = {}, action) => {
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