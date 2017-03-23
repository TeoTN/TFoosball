import * as types from './match.types';

export const defaultData = {list: [], page: 1, totalPages: 1, count: 0 };

export default (state = defaultData, action) => {
    switch (action.type) {
        case types.LIST:
            return {
                ...state,
                list: action.response.results,
                page: parseInt(action.response.page, 10),
                totalPages: Math.ceil(action.response.count / action.response.page_size),
                count: action.response.count,
            };
        default:
            return state;
    }
}
