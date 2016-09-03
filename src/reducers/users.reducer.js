import * as types from '../actions/user.types';
import users from '../mocks/users';
import choice from '../utils/choice';
import getRoles from '../utils/roles';
import 'babel-polyfill';

const user = (state, action) => {
    switch (action.type) {
        case types.ADD:
            return {
                ...action.userData
            };
        case types.CHOOSE:
        case types.UPDATE:
            if (state.id !== action.id) return state;
            return Object.assign({...state}, {...action.userData});
        default:
            return state;
    }
};

const compareByProp = (prop, dir) => (a, b) => {
    return a[prop] > b[prop] ? dir : a[prop] === b[prop] ? 0 : -dir;
};

export default (state = users.sort(compareByProp('exp', -1)), action) => {
    switch (action.type) {
        case types.ADD:
            return [
                user(undefined, action),
                ...state
            ];
        case types.UPDATE:
            return state.map(u => user(u, action));
        case types.DELETE:
            return state.filter( user => user.id !== action.id );
        case types.CHOOSE:
            const selected = state.filter(u => u.selected);
            if (selected.length < 4) { //TODO Feature request 1-1 matches
                throw new Error("Insufficient number of players selected.");
            }
            const chosen = choice(selected, 4);
            const playing = getRoles(chosen);
            return state.map(u => (playing[u.username]) ? playing[u.username] : u);
        case types.SORT_EXP:
            return getSortedUsers(state, 'exp');
        case types.SORT_NAME:
            return getSortedUsers(state, 'username');
        default:
            return state;
    }
};

export const getSortedUsers = (state, prop) => {
    switch (prop) {
        case 'username':
            return state.slice(0).sort(compareByProp('username', 1));
        case 'exp':
            return  state.slice(0).sort(compareByProp('exp', -1));
        default:
            return state;
    }
};