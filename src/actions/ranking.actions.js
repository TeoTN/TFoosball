import * as types from './ranking.types';

export const sortBy = (column, isAscendingOrder = true) => ({
    type: types.SORT,
    column,
    isAscendingOrder
});