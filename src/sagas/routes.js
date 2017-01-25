import { router } from 'redux-saga-router';
import { browserHistory as history } from 'react-router';
import { profileMatches, profileStats } from './profile';
import { fetchUsers } from './users';
import { listMatches } from './match';

const routes = {
    '/profile/:username/matches': profileMatches,
    '/profile/:username/stats': profileStats,
    '/match': fetchUsers,
    '/matches': listMatches,
    '/ranking': fetchUsers,
};

export function* routerSaga() {
    while (true) {
        yield* router(history, routes);
    }
}