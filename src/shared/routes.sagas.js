import { router } from 'redux-saga-router';
import { browserHistory as history } from 'react-router';
import { profileMatches, profileStats } from '../profile/profile.sagas';
import { fetchUsers } from '../users/users.sagas';
import { listMatches } from '../matches/matches.sagas';

const routes = {
    '/profile/:username/matches': profileMatches,
    '/profile/:username/stats': profileStats,
    '/match': fetchUsers,
    '/matches/:page': listMatches,
    '/ranking': fetchUsers,
};

export function* routerSaga() {
    while (true) {
        yield* router(history, routes);
    }
}