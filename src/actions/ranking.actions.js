import * as types from './ranking.types';

export const sort = (column, order) => ({
    type: types.SORT,
    column,
    order
});