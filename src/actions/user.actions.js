import * as types from './user.types';

export const userDelete = (id) => ({
    type: types.DELETE,
    id
});

let lastUserId = 0;
export const userNew = (username) => ({
    type: types.ADD,
    userData: {
        id: lastUserId++,
        username,
        exp: 1000,
    },
});

export const userToggle = (user) => ({
    type: types.UPDATE,
    id: user.id,
    userData: {
        selected: !user.selected,
    }
});

export const userUpdate = (id, userData) => ({
    type: types.UPDATE,
    id,
    userData,
});

export const choosePlayersForMatch = () => ({
    type: types.CHOOSE
});

export const sortByExp = () => ({
    type: types.SORT_EXP
});

export const sortByName = () => ({
    type: types.SORT_NAME
});

export const receiveUsers = (response) => ({
    type: types.RECEIVE_LIST,
    response
});
