import * as fromPlay from './play.actions';
import { combineReducers } from "redux";

const defaultStats = {
    red: 0,
    blue: 0
};

export const stats = (state = defaultStats, action) => {
    switch (action.type) {
        case fromPlay.REQUEST_STATS_DONE:
            return action.response;
        default:
            return state;
    }
};
export default combineReducers({
    stats,
});
