import { take, select, actionChannel } from 'redux-saga/effects';
import { buffers } from 'redux-saga';

export function* logger() {
    const queuedActions = yield actionChannel('*', buffers.sliding(10));

    while (true) {
        const action = yield take(queuedActions);
        const state = yield select();

        console.group(action.type);
        console.log('%c Action', 'color: blue', action);
        console.log('%c Next state', 'color: green', state);
        console.groupEnd(action.type);
    }
}
