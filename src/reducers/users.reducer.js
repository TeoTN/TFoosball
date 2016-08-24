import users from '../mocks/users';
import choice from '../utils/choice';

const userUpdate = (state, action) => {
    let updated = Object.assign({...state}, {...action});
    delete updated.type;
    return updated;
};

const compareUsersByExp = (userA, userB) => {
    const propA = userA.exp;
    const propB = userB.exp;
    return propA > propB ? -1 : propA === propB ? 0 : 1;
};

export default (state = users.sort(compareUsersByExp), action) => {
    switch (action.type) {
        case 'ADD_USER':
            let user = {
                ...action,
                type: undefined
            };
            return [
                ...state,
                user
            ];
        case 'UPDATE_USER':
            return state.map(user =>
                (user.id !== action.id) ? user : userUpdate(user, action)
            );
        case 'DELETE_USER':
            return state.filter( user => user.id !== action.id );
        case 'CHOOSE_PLAYERS':
            const selected = state.filter(user => user.selected);
            if (selected.length < 4) {
                throw new Error("Insufficient number of players selected.");
            }
            const chosen = choice(selected.map(user => user.id), 4);
            let team = 0;
            return state.map(user =>
                userUpdate(user, {
                    playing: chosen.includes(user.id),
                    team: (team++ < 2) ? 'red' : 'blue',
                })
            );
        default:
            return state;
    }
};