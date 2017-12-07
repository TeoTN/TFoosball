import * as types from "./user.types";
import * as fromUsers from './users.actions';
import choice from "../utils/choice";
import getRoles from "../utils/roles";
import {combineReducers} from "redux";
import {createSelector} from "reselect";


export const user = (state = {}, action) => {
    switch (action.type) {
        case types.ADD:
            return {
                ...action.userData
            };
        case types.CHOOSE:
        case types.UPDATE:
        case types.ASSIGN:
            if (state.id !== action.id) return state;
            return Object.assign({}, state, action.userData);
        case types.UPDATE_LIST:
            return Object.assign({}, state, action.userList.find(u => u.id === state.id));
        case types.SWAP_POSITIONS:
            if (state.playing) {
                return Object.assign({}, state, { position: state.position === 'att' ? 'def' : 'att'});
            }
            return state;
        case types.SWAP_SIDES:
            if (state.playing) {
                return Object.assign({}, state, { team: state.team === 'red' ? 'blue' : 'red' })
            }
            return state;
        default:
            return state;
    }
};

export const getSortedUsers = (state, column, isAscendingOrder) =>
    state.slice().sort((a, b) => {
        const comparison = a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0;
        return isAscendingOrder ? comparison : -comparison;
    });

export const clean = (state = [], action) => {
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

export const users = (state = [], action) => {
    switch (action.type) {
        case types.ADD:
            return [
                user(undefined, action),
                ...state
            ];
        case types.UPDATE:
        case types.SWAP_POSITIONS:
        case types.SWAP_SIDES:
        case types.ASSIGN:
            return state.map(u => user(u, action));
        case types.DELETE:
            return state.filter(user => user.id !== action.id);
        case types.CHOOSE:
            const intermediateState = clean(state, action);
            const selected = intermediateState.filter(u => u.selected);
            if (selected.length < 4) { //TODO Feature request 1-1 matches
                throw new Error("Insufficient number of players selected.");
            }
            const playing = getRoles(choice(selected, 4));
            return intermediateState.map(u => (playing[u.username]) ? playing[u.username] : u);
        case types.SORT:
            return getSortedUsers(state, action.column, action.isAscendingOrder);
        case types.RECEIVE_LIST:
            const data = Array.isArray(action.response) ? action.response : [];
            return getSortedUsers(data, 'exp', false);
        case types.UPDATE_LIST:
            const updated = state.map(u => user(u, action));
            return getSortedUsers(updated, 'exp', false);
        default:
            return state;
    }
};

const defaultUsersAutocompletion = {
    loadingEmailAutocompletion: false,
    emailAutocompletion: [],
};

export const usersAutocompletion = (state = defaultUsersAutocompletion, action) => {
    switch (action.type) {
        case types.FETCH_AUTOCOMPLETION:
            return { ...state, loadingEmailAutocompletion: true, emailAutocompletion: defaultUsersAutocompletion.emailAutocompletion};
        case types.RECEIVED_AUTOCOMPLETION:
            return { ...state, loadingEmailAutocompletion: false, emailAutocompletion: action.data };
        default:
            return state;
    }
};

export function entities(state={}, action) {
    switch (action.type) {
        case fromUsers.RECEIVE_LIST: {
            return action.entities;
        }
        case fromUsers.UPDATE_LIST: {
            return {
                ...state,
                ...action.entities,
            };
        }
        case fromUsers.ADD:
        case fromUsers.UPDATE:
        case fromUsers.ASSIGN: {
            return {
                ...state,
                [action.userData.id]: action.userData,
            };
        }
        case fromUsers.DELETE: {
            const {[action.id]: _, ...others} = state;
            return others;
        }
        default:
            return state;
    }
}

export function selected(state = [], action) {
    switch (action.type) {
        case fromUsers.TOGGLE: {
            const idx = state.indexOf(action.id);
            return idx === -1 ?
                [...state, action.id] :
                [...state.slice(0, idx), ...state.slice(idx+1)]
        }
        default:
            return state;
    }
}

const initialPositions = {red: {att: null, def: null}, blue: {att: null, def: null}};
export function positions(state=initialPositions, action) {
    const { red, blue } = state;
    switch (action.type) {
        case fromUsers.SWAP_SIDES: {
            return {
                red: blue,
                blue: red,
            };
        }
        case fromUsers.SWAP_POSITIONS: {
            return {
                red: { att: red.def, def: red.att },
                blue: { att: blue.def, def: blue.att },
            };
        }
        case fromUsers.CHOOSE: {
            return {
                ...action.preset,
            };
        }
        default:
            return state;
    }
}

export function autocompletion(state=defaultUsersAutocompletion, action) {
    switch (action.type) {
        case fromUsers.FETCH_AUTOCOMPLETION:
            return {
                ...state,
                loading: true,
                data: defaultUsersAutocompletion.emailAutocompletion
            };
        case fromUsers.RECEIVED_AUTOCOMPLETION:
            return {
                ...state,
                loading: false,
                data: action.data
            };
        default:
            return state;
    }
}

export function sorting(state={}, action) {
    switch (action.type) {
        case fromUsers.SORT:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

export const reducer = combineReducers({
    entities,
    selected,
    positions,
    autocompletion,
    sorting,
});

/* SELECTORS */
export const getUsersState = state => state.usersReducer;
export const getUsers = createSelector(getUsersState, state => state.entities);
export const getUsersIds = createSelector(getUsers, users => Object.keys(users));
export const getSelectedUsers = createSelector(getUsersState, state => state.selected);
export const getPositions = createSelector(getUsersState, state => state.positions);
export const getSorting = createSelector(getUsersState, state => state.sorting);
export const getAutocompletionState = createSelector(getUsersState, state => state.autocompletion);
export const getUsersOnPositions = createSelector([getUsers, getPositions], (users, positions) => positions.map(idx => users[idx]));
export const getUsersIdsSorted = createSelector(
    [getUsers, sorting],
    (users, sorting) => getSortedUsers(Object.values(users), sorting.column, sorting.isAscendingOrder).map(user => user.id)
);

export default users;
