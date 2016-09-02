import users from '../mocks/users';
import choice from '../utils/choice';
import getRoles from '../utils/roles';

const user = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...action.userData
            };
        case 'CHOOSE_PLAYERS':
        case 'UPDATE_USER':
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
        case 'ADD_USER':
            return [
                user(undefined, action),
                ...state
            ];
        case 'UPDATE_USER':
            return state.map(u => user(u, action));
        case 'DELETE_USER':
            return state.filter( user => user.id !== action.id );
        case 'CHOOSE_PLAYERS':
            const selected = state.filter(u => u.selected);
            if (selected.length < 4) { //TODO Feature request 1-1 matches
                throw new Error("Insufficient number of players selected.");
            }
            const chosen = choice(selected, 4);
            const roles = getRoles(chosen);
            const newState = state.map(u => {
                const playing = chosen.map(u => u.id).includes(u.id);
                return user(u, {
                    type: action.type,
                    id: u.id,
                    userData: {
                        playing: playing,
                        team: playing ? roles[u.username].team : undefined,
                        role: playing ? roles[u.username].role : undefined,
                    }
                })
            });
            return newState;
        case 'USER::SORT::EXP':
            return getSortedUsers(state, 'exp');
        case 'USER::SORT::NAME':
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