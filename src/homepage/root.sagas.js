import { loginFlow, sessionExpired } from '../shared/auth/auth.sagas';
import { logger } from '../shared/logger.sagas';
import { routerSaga } from '../shared/routes.sagas';
import { publish, removeMatch } from '../matches/matches.sagas';
import { playScore } from '../play/play.sagas';
import { teams } from '../teams/teams.sagas';
import { onRequestSaveSettings } from '../settings/settings.sagas';
import { users } from '../users/users.sagas';


export default function* rootSaga() {
    yield [
        teams(),
        logger(),
        sessionExpired(),
        loginFlow(),
        routerSaga(),
        publish(),
        removeMatch(),
        playScore(),
        onRequestSaveSettings(),
        users(),
    ];
}