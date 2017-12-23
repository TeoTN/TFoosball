import * as fromUsers from './users.actions';
import { combineReducers } from "redux";
import { createSelector } from "reselect";
import pick from 'lodash/pick';
import intersection from 'lodash/intersection';
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
        case fromUsers.UPDATE: {
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

const initialPositions = {
    playing: [],
    red: [],
    blue: [],
    att: [],
    def: [],
};

export function positions(state = initialPositions, action) {
    const {red, blue, att, def} = state;

    switch (action.type) {
        case fromUsers.SWAP_SIDES: {
            return {
                ...state,
                red: blue,
                blue: red,
            };
        }
        case fromUsers.SWAP_POSITIONS: {
            return {
                ...state,
                att: def,
                def: att,
            };
        }
        case fromUsers.CHOOSE: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case fromUsers.ASSIGN: {
            const { user, position, team } = action.payload;
            const previousUser = intersection(state[position], state[team])[0];
            const cleanedState = {
                ...mapValues(state, arr => arr.filter(id => id !== user.id && id !== previousUser)),
            };
            return {
                ...cleanedState,
                playing: [...cleanedState.playing, user.id],
                [position]: [...cleanedState[position], user.id],
                [team]: [...cleanedState[team], user.id],
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

const defaultMetaState = {
    loadingEntities: false,
    loadedEntities: false,
};

export function meta(state = defaultMetaState, action) {
    switch (action.type) {
        case fromUsers.UPDATE_LIST:
        case fromUsers.RECEIVE_LIST:
            return {
                ...state,
                loadingEntities: false,
                loadedEntities: true,
            };
        case fromUsers.FETCH_ENTITIES:
            return {
                ...state,
                loadingEntities: true,
                loadedEntities: false,
            };
        case fromUsers.ERROR_FETCHING_ENTITIES:
            return {
                ...state,
                loadingEntities: false,
                loadedEntities: false,
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
    meta,
});

/* SELECTORS */
export const getUsersState = state => state.users;
export const getUsers = createSelector(getUsersState, state => state.entities);
export const getMetadata = createSelector(getUsersState, state => state.meta);
export const getUsersIds = createSelector(getUsers, users => Object.keys(users));
export const getSelectedIds = createSelector(getUsersState, state => state.selected);
export const getSelectedUsers = createSelector([getUsers, getSelectedIds], pick);
export const getPositionsState = createSelector(getUsersState, state => state.positions);
export const getPlaying = createSelector(getPositionsState, positions => positions.playing);
export const getRedAtt = createSelector(getPositionsState, positions => intersection(positions.red, positions.att)[0]);
export const getRedDef = createSelector(getPositionsState, positions => intersection(positions.red, positions.def)[0]);
export const getBlueAtt = createSelector(getPositionsState, positions => intersection(positions.blue, positions.att)[0]);
export const getBlueDef = createSelector(getPositionsState, positions => intersection(positions.blue, positions.def)[0]);
export const arePositionsSet = createSelector(getPlaying, playing => playing.length === 4);
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
export const getUsersPlayingById = createSelector(
    [getRedAtt, getRedDef, getBlueAtt, getBlueDef],
    (red_att, red_def, blue_att, blue_def) => ({red_def, red_att, blue_def, blue_att})
);
export const getUsersPlaying = createSelector(
    [getUsers, getUsersPlayingById],
    (users, playing) => mapValues(playing, id => users[id])
);

export default reducer;
