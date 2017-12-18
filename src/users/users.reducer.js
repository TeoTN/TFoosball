import * as fromUsers from './users.actions';
import { combineReducers } from "redux";
import { createSelector } from "reselect";
import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';


export const getSortedUsers = (state, column, isAscendingOrder) =>
    state.slice().sort(({[column]: value1}, {[column]: value2}) => {
        const isAscendingFactor = isAscendingOrder ? +1 : -1;
        let v1 = value1, v2 = value2;
        if (typeof value1 === 'string' && typeof value2 === 'string') {
            v1 = value1.toLowerCase();
            v2 = value2.toLowerCase();
        }
        return v1 > v2 ? isAscendingFactor : v1 < v2 ? -isAscendingFactor : 0;
    });

const defaultAutocompletion = {
    loading: false,
    emails: [],
};

export function entities(state = {}, action) {
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
            const {[action.id]: _, ...others} = state; // eslint-disable-line no-unused-vars
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
                [...state.slice(0, idx), ...state.slice(idx + 1)]
        }
        default:
            return state;
    }
}

const initialPositions = {red: {att: null, def: null}, blue: {att: null, def: null}};

export function positions(state = initialPositions, action) {
    const {red, blue} = state;
    switch (action.type) {
        case fromUsers.SWAP_SIDES: {
            return {
                red: blue,
                blue: red,
            };
        }
        case fromUsers.SWAP_POSITIONS: {
            return {
                red: {att: red.def, def: red.att},
                blue: {att: blue.def, def: blue.att},
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

export function autocompletion(state = defaultAutocompletion, action) {
    switch (action.type) {
        case fromUsers.FETCH_AUTOCOMPLETION:
            return {
                ...state,
                loading: true,
                emails: defaultAutocompletion.emails
            };
        case fromUsers.RECEIVED_AUTOCOMPLETION:
            return {
                ...state,
                loading: false,
                emails: action.emails
            };
        default:
            return state;
    }
}

const defaultSortingState = {column: 'exp', isAscendingOrder: false};

export function sorting(state = defaultSortingState, action) {
    switch (action.type) {
        case fromUsers.SORT:
            // TODO When column is changed, default isAscendingOrder to false
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
export const getUsersState = state => state.users;
export const getUsers = createSelector(getUsersState, state => state.entities);
export const getUsersIds = createSelector(getUsers, users => Object.keys(users));
export const getSelectedIds = createSelector(getUsersState, state => state.selected);
export const getSelectedUsers = createSelector([getUsers, getSelectedIds], pick);
export const getPositionsIds = createSelector(getUsersState, state => state.positions);
export const getPositions = createSelector([getUsers, getPositionsIds], (users, {red, blue}) => ({
    red: mapValues(red, idx => users[idx]),
    blue: mapValues(blue, idx => users[idx])
}));
export const getSorting = createSelector(getUsersState, state => state.sorting);
export const getAutocompletionState = createSelector(getUsersState, state => state.autocompletion);
export const getUsersSorted = createSelector(
    [getUsers, getSorting],
    (users, sorting) => getSortedUsers(Object.values(users), sorting.column, sorting.isAscendingOrder)
);
export const getTop3 = createSelector(
    getUsers,
    users => getSortedUsers(Object.values(users), 'exp', false).slice(0, 3)
);
export const getUsersPlaying = createSelector(getPositionsIds, (positions) => ({
    red_def: positions.red.def, red_att: positions.red.att,
    blue_def: positions.blue.def, blue_att: positions.blue.att,
}));

export default reducer;
