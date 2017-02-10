import { REQUEST_STATS_DONE } from './play.actions';

export default (state = {}, action) => {
    switch (action.type) {
        case REQUEST_STATS_DONE:
            return {
                ...state,
                stats: action.response,
            };
        default:
            return state;
    }
}
