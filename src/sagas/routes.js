import { router } from 'redux-saga-router';
import { browserHistory as history } from 'react-router';
import { profileMatches } from './profile';

const routes = {
    '/profile/:username/matches': profileMatches,
};

export function* routerSaga() {
    yield* router(history, routes);
}