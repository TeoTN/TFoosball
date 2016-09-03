import * as types from '../actions/error.types';

let lastErrorId = 0;
export default (state = [], {type, id, msg}) => {
    switch (type) {
        case types.RAISE:
            return [
                {
                    id: lastErrorId++,
                    msg
                },
                ...state
            ];
        case types.HANDLE:
            return state.filter(error => error.id !== id );
        default:
            return state;
    }
}