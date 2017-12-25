import {router} from 'redux-saga-router';
import {browserHistory as history} from 'react-router';
import {profileMatches, profileStats} from '../profile/profile.sagas';
import {fetchUsers} from '../users/users.sagas';
import {listMatches} from '../matches/matches.sagas';
import {fetchPendingMembers, fetchTeams} from '../teams/teams.sagas';
import {cleanNotifications, whatsNewModal} from './shared.sagas';
import {acceptInvitation} from "./auth/auth.sagas";

const options = {
    matchAll: true,
    beforeRouteChange: function* () {
        yield [cleanNotifications(), whatsNewModal()];
    }
};

const routes = {
    '/match': fetchUsers,
    '/profile/:username/*': profileStats,
    '/profile/:username/matches/:page?': profileMatches,
    '/clubs/joined': function* () {
        yield [fetchPendingMembers(), fetchTeams()];
    },
    '/clubs/admin': fetchUsers,
    '/clubs/admin/:username': profileStats,
    '/matches/:page': listMatches,
    '/ranking': fetchUsers,
    '/accept/:activation_code': acceptInvitation,
};

export function* routerSaga() {
    while (true) {
        yield* router(history, routes, options);
    }
}
