import { take, select } from 'redux-saga/effects';

export function* logger() {
    while (true) {
        const action = yield take('*');
        const state = yield select();

        console.group(action.type);
        console.log('%c Action', 'color: blue', action);
        console.log('%c Next state', 'color: green', state);
        console.groupEnd(action.type);
    }
}
