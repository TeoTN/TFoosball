import * as types from '../users/user.types';

const model = {
    "desktop": {
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
    },
    "mobile": {
        "username": "Username",
        "exp": "Experience"
    }
};

export default (state = {sorting: {column: "exp", isAscendingOrder: true}, model}, action) => {
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
