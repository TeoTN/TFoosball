import * as types from '../users/user.types';

const model = {
    "desktop": {
        "username": "Username",
        "first_name": "First name",
        "last_name": "Last name",
        "exp": "EXP",
        "att_ratio": "Attack ratio",
        "def_ratio": "Defense ratio",
        "lose_streak": "Lose streak",
        "win_streak": "Win streak",
        "lowest_exp": "Lowest EXP",
        "highest_exp": "Highest EXP"
    },
    "mobile": {
        "username": "Username",
        "exp": "Experience"
    }
};

export default (state = {sorting: {column: "exp", isAscendingOrder: false}, model}, action) => {
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
            return state;
    }
}
