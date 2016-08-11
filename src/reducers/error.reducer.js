let lastErrorId = 0;
export default (state = [], {type, id, msg}) => {
    switch (type) {
        case 'RAISE_ERROR':
            return [
                ...state,
                {
                    id: lastErrorId++,
                    msg
                }
            ];
        case 'HANDLE_ERROR':
            return state.filter(error => error.id !== id );
        default:
            return state;
    }
}