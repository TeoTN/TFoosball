import * as types from '../actions/ranking.types';
import checkMobile from "../utils/checkMobile";

const model = {
    "id": "ID",
    "username": "Username",
    "first_name": "First name",
    "last_name": "Last name",
    "exp": "Experience",
    "att_ratio": "Attack ratio",
    "def_ratio": "Defense ratio",
    "lose_streak": "Lose streak",
    "win_streak": "Win streak",
    "lowest_exp": "Lowest experience",
    "highest_exp": "Highest experience"
};

export default (state = {}, action) => {
    switch (action.type) {
        case types.SORT:
            return {
                ...state,
                sorting: {
                    column: action.column,
                    isAscendingOrder: action.isAscendingOrder
                }
            };
        default:
            return {
                ...state,
                sorting: {
                    column: "id",
                    isAscendingOrder: true
                },
                model,
                isMobile: checkMobile()
            };
    }
}
