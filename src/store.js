import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './homepage/root.sagas';
import reducer, { getPersistentState } from './homepage/root.reducer'
import { loadState, saveState } from './persistence';


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

const initialState = reducer(undefined, {});
const preloadedState = {...initialState, ...loadState()};
const store = createStore(reducer, preloadedState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

let currentSavedState;
store.subscribe(() => {
    let previousSavedState = currentSavedState;
    const stateSnapshot = store.getState();
    currentSavedState = getPersistentState(stateSnapshot);

    if (previousSavedState !== currentSavedState && !Object.isEmpty(currentSavedState)) {
        saveState(currentSavedState);
    }
});

if (process.env.NODE_ENV !== 'production') {
    store.dispatch = createLoggingDispatch(store);
}

export default store;
