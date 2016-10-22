import * as types from '../actions/profile.types';

export default (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_PROFILE:
        case types.UPDATE:
            return Object.assign({}, {...state}, {...action.response});
        default:
            return state;
    }
}
