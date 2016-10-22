import * as types from '../actions/profile.types';
import * as authTypes from '../actions/auth.types';

export default (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_PROFILE:
        case types.UPDATE:
            return Object.assign({}, {...state}, {...action.response});
        case authTypes.SIGN_OUT:
            return {};
        default:
            return state;
    }
}
