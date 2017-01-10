import * as types from "../actions/user.types";
import * as match_types from "../actions/match.types";
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
        case match_types.SENT:
            // eslint-disable-next-line
            const {position, team, selected, playing, ...newState} = state;
            return newState;
        default:
            return state;
    }
};

export const getSortedUsers = (state, column, isAscendingOrder) =>
    state.sort((a, b) => !(isAscendingOrder ^ a[column] > b[column]));

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
        case match_types.SENT:
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
        default:
            return state;
    }
};
