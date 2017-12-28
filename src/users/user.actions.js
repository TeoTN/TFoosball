import * as types from './user.types';

export const choosePlayersForMatch = (preset) => ({
    type: types.CHOOSE,
    preset,
});

export const sortBy = (column, isAscendingOrder = true) => ({
    type: types.SORT,
    column,
    isAscendingOrder
});

export const updateUsers = (response) => ({
    type: types.UPDATE_LIST,
    userList: response,
});

export const swapSides = () => ({ type: types.SWAP_SIDES, });
export const swapPositions = () => ({ type: types.SWAP_POSITIONS, });
