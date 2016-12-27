import { router } from 'redux-saga-router';
import { browserHistory as history } from 'react-router';
import { profileMatches, profileStats } from './profile';

const routes = {
    '/profile/:username/matches': profileMatches,
    '/profile/:username/stats': profileStats,
};

export function* routerSaga() {
    while (true) {
        yield* router(history, routes);
    }
}