import * as types from './user.types';


export const fetchEmailAutocompletion = (input) => ({
    type: types.FETCH_AUTOCOMPLETION,
    input,
});

export const receivedEmailAutocompletion = (data) => ({
    type: types.RECEIVED_AUTOCOMPLETION,
    data,
});


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

export const userAssign = (id, userData) => ({
    type: types.ASSIGN,
    id,
    userData,
});

export const choosePlayersForMatch = (preset) => ({
    type: types.CHOOSE,
    preset,
});

export const sortByExp = () => ({
    type: types.SORT_EXP
});

export const sortByName = () => ({
    type: types.SORT_NAME
});

export const sortBy = (column, isAscendingOrder = true) => ({
    type: types.SORT,
    column,
    isAscendingOrder
});

export const receiveUsers = (response) => ({
    type: types.RECEIVE_LIST,
    response,
});

export const updateUsers = (response) => ({
    type: types.UPDATE_LIST,
    userList: response,
});

export const swapSides = () => ({ type: types.SWAP_SIDES, });
export const swapPositions = () => ({ type: types.SWAP_POSITIONS, });
