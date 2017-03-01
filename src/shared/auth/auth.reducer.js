import * as types from './auth.types';
import { REQUEST_SAVE_PROFILE, REQUEST_SAVE_MEMBER} from '../../settings/settings.actions';

const profile = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_SAVE_PROFILE:
        case REQUEST_SAVE_MEMBER:
            return Object.assign(state, action.partialData);
        default:
            return state;
    }
};

const auth = (state = {}, action) => {
    switch (action.type) {
        case types.SET_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case types.SIGNED_OUT:
            return {};
        case types.SET_PROFILE:
            return {
                ...state,
                profile: action.response
            };
        case REQUEST_SAVE_MEMBER:
        case REQUEST_SAVE_PROFILE:
            return {
                ...state,
                profile: profile(state.profile, action),
            };
        default:
            return state;
    }
};
export default auth;