export function raiseError(msg) {
    return {
        type: 'RAISE_ERROR',
        msg
    };
}

export function handleError(id) {
    return {
        type: 'HANDLE_ERROR',
        id
    };
}