import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './homepage/root.sagas';
import reducer from './homepage/root.reducer'
import { loadState, saveState } from './persistence';
import { teams } from "./teams/teams.reducer";
import { difference } from "lodash";


const createLoggingDispatch = (store) => {
    const rawDispatch = store.dispatch;
    if (!console.group) {
        return rawDispatch;
    }
    return (action) => {
        const previousState = store.getState();
        console.group(action.type);
        console.log('%c Previous state', 'color: gray', previousState);
        console.log('%c Action', 'color: blue', action);
        const nextState = rawDispatch(action);
        console.log('%c Next state', 'color: green', store.getState());
        if (previousState === nextState) {
            console.log('%c State reference hasn\'t changed', 'color: orange');
        }
        console.groupEnd(action.type);
        return nextState;
    };
};

const sagaMiddleware = createSagaMiddleware();

// TODO Remove one-off reloading state after shape change

const preloadedState = loadState() || { teams: {}};
let store;
const oldShape = Object.keys(preloadedState.teams);
const newShape = Object.keys(teams(undefined, {}));
if (difference(newShape, oldShape).length === 0) {
    store = createStore(reducer, preloadedState, applyMiddleware(sagaMiddleware));
} else {
    store = createStore(reducer, reducer(undefined, {}), applyMiddleware(sagaMiddleware));
}

sagaMiddleware.run(rootSaga);

let currentSavedState;
store.subscribe(() => {
    let previousSavedState = currentSavedState;
    const stateSnapshot = store.getState();
    currentSavedState = { auth: stateSnapshot.auth, teams: stateSnapshot.teams };

    if (previousSavedState !== currentSavedState && !Object.isEmpty(currentSavedState)) {
        saveState(currentSavedState);
    }
});

if (process.env.NODE_ENV !== 'production') {
    store.dispatch = createLoggingDispatch(store);
}

export default store;
