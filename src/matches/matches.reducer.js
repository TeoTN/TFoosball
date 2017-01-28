import * as types from './match.types';

export default (state = { page: 1, totalPages: 1, list: [] }, action) => {
    switch (action.type) {
        case types.LIST:
            return {
                ...state,
                list: action.response.results,
                page: parseInt(action.response.page, 10),
                totalPages: Math.ceil(action.response.count / action.response.page_size),
            };
        default:
            return state;
    }
}
