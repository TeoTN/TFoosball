export function finish(result) {
    return {
        type: 'FINISH_MATCH',
        result
    };
}
