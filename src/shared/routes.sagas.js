import { router } from 'redux-saga-router';
import { browserHistory as history } from 'react-router';
import { profileMatches, profileStats } from '../profile/profile.sagas';
import { fetchUsers } from '../users/users.sagas';
import { listMatches } from '../matches/matches.sagas';
import { settings } from '../settings/settings.sagas';
import { fetchPendingMembers, fetchTeams } from '../teams/teams.sagas';


const options = {
    shouldFallThrough: true,
};

const routes = {
    '/profile/:username/*': profileStats,
    '/profile/:username/matches/:page?': profileMatches,
    '/profile/:username/teams': function*() { yield [fetchPendingMembers, fetchTeams ]; },
    '/matches/:page': listMatches,
    '/match': fetchUsers,
    '/ranking': fetchUsers,
    '/settings': settings,
};

export function* routerSaga() {
    while (true) {
        yield* router(history, routes, options);
    }
}