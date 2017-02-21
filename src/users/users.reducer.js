import * as types from "./user.types";
import choice from "../utils/choice";
import getRoles from "../utils/roles";

const user = (state, action) => {
    switch (action.type) {
        case types.ADD:
            return {
                ...action.userData
            };
        case types.CHOOSE:
        case types.UPDATE:
            if (state.id !== action.id) return state;
            return Object.assign({}, state, action.userData);
        case types.UPDATE_LIST:
            return Object.assign(state, action.userList.find(u => u.id === state.id));
        default:
            return state;
    }
};

export const getSortedUsers = (state, column, isAscendingOrder) =>
    state.slice().sort((a, b) => {
        const comparison = a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0;
        return isAscendingOrder ? comparison : -comparison;
    });

const clean = (state = [], action) => {
    switch (action.type) {
        case types.CHOOSE:
            return state.map(u => ({
                ...u,
                playing: false,
                team: undefined,
                position: undefined,
            }));
        default:
            return state;
    }
};

export default (state = [], action) => {
    switch (action.type) {
        case types.ADD:
            return [
                user(undefined, action),
                ...state
            ];
        case types.UPDATE:
            return state.map(u => user(u, action));
        case types.DELETE:
            return state.filter(user => user.id !== action.id);
        case types.CHOOSE:
            const intermediateState = clean(state, action);
            const selected = intermediateState.filter(u => u.selected);
            if (selected.length < 4) { //TODO Feature request 1-1 matches
                throw new Error("Insufficient number of players selected.");
            }
            const chosen = choice(selected, 4);
            const playing = getRoles(chosen);
            return intermediateState.map(u => (playing[u.username]) ? playing[u.username] : u);
        case types.SORT:
            return getSortedUsers(state, action.column, action.isAscendingOrder);
        case types.RECEIVE_LIST:
            const data = Array.isArray(action.response) ? action.response : [];
            return getSortedUsers(data, 'exp', false);
        case types.UPDATE_LIST:
            const updated = state.map(u => user(u, action));
            return getSortedUsers(updated, 'exp', false)
        default:
            return state;
    }
};
