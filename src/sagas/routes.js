import { router } from 'redux-saga-router';
import { browserHistory as history } from 'react-router';
import { profileMatches, profileStats } from './profile';
import { fetchUsers } from './users';

const routes = {
    '/profile/:username/matches': profileMatches,
    '/profile/:username/stats': profileStats,
    '/match': fetchUsers,
    '/ranking': fetchUsers,
};

export function* routerSaga() {
    while (true) {
        yield* router(history, routes);
    }
}