import * as types from '../actions/match.types';

export default (state = [], action) => {
    switch (action.type) {
        case types.SENT:
            return [
                ...state,
                action.response,
            ];
        default:
            return state;
    }
}
