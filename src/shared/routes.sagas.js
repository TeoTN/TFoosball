import { fork, spawn } from "redux-saga/effects";
import { router } from 'redux-saga-router';
import { browserHistory as history } from 'react-router';
import { profileMatches, profileStats } from '../profile/profile.sagas';
import { fetchUsers } from '../users/users.sagas';
import { listMatches } from '../matches/matches.sagas';
import { teamAdmin, teamInvite, teamList, teamPending } from '../teams/teams.sagas';
import { checkWhatsNew, cleanNotifications } from './shared.sagas';
import { acceptInvitation } from "../auth/auth.sagas";
import { playRoute } from "../play/play.sagas";

const options = {
    matchAll: true,
    beforeRouteChange: function* () {
        yield cleanNotifications();
        yield spawn(checkWhatsNew);
    }
};

const routes = {
    '/accept/:activation_code': acceptInvitation,
    '/match': playRoute,
    '/profile/:username/*': profileStats,
    '/profile/:username/matches/:page?': profileMatches,
    '/clubs/joined': teamList,
    '/clubs/invite': teamInvite,
    '/clubs/pending': teamPending,
    '/clubs/admin/?*': teamAdmin,
    '/clubs/admin/:username': profileStats,
    '/matches/:page': listMatches,
    '/ranking': fetchUsers,
};

export function* routerSaga() {
    yield fork(router, history, routes, options);
}
