import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './homepage/root.sagas';
import reducer from './homepage/root.reducer'
import { loadState, saveState } from './persistence';


const createLoggingDispatch = (store) => {
    const rawDispatch = store.dispatch;
    if (!console.group) {
        return rawDispatch;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c Previous state', 'color: gray', store.getState());
        console.log('%c Action', 'color: blue', action);
        const nextState = rawDispatch(action);
        console.log('%c Next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return nextState;
    };
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, loadState(), applyMiddleware(sagaMiddleware));
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