import users from '../mocks/users';
import choice from '../utils/choice';
import getRoles from '../utils/roles';

const userUpdate = (state, action) => {
    let updated = Object.assign({...state}, {...action});
    delete updated.type;
    return updated;
};

const compareByProp = (prop, dir) => (a, b) => {
    return a[prop] > b[prop] ? dir : a[prop] === b[prop] ? 0 : -dir;
};

export default (state = users.sort(compareByProp('exp', -1)), action) => {
    switch (action.type) {
        case 'ADD_USER':
            let user = {
                ...action,
                type: undefined
            };
            return [
                user,
                ...state
            ];
        case 'UPDATE_USER':
            return state.map(user =>
                (user.id !== action.id) ? user : userUpdate(user, action)
            );
        case 'DELETE_USER':
            return state.filter( user => user.id !== action.id );
        case 'SORT_BY_EXP':
            return state.slice(0).sort(compareByProp('exp', -1));
        case 'SORT_BY_NAME':
            return state.slice(0).sort(compareByProp('username', 1));
        case 'CHOOSE_PLAYERS':
            const selected = state.filter(user => user.selected);
            if (selected.length < 4) { //TODO Feature request 1-1 matches
                throw new Error("Insufficient number of players selected.");
            }
            const chosen = choice(selected, 4);
            const roles = getRoles(chosen);
            return state.map(user => {
                const playing = chosen.map(user => user.id).includes(user.id);
                return userUpdate(user, {
                    playing: playing,
                    team: playing ? roles[user.username].team : undefined,
                    role: playing ? roles[user.username].role : undefined,
                })
            });
        default:
            return state;
    }
};