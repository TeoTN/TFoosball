import * as types from './infobar.types';

let lastInfoId = 0;
export default (state = [], {type, id, msg}) => {
    switch (type) {
        case types.DISPLAY:
            return [{ id: lastInfoId++, msg }, ...state ];
        case types.HANDLE:
            return state.filter(info => info.id !== id );
        default:
            return state;
    }
}