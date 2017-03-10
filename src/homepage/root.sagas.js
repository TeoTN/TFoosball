import { loginFlow } from '../shared/auth/auth.sagas';
import { logger } from '../shared/logger.sagas';
import { routerSaga } from '../shared/routes.sagas';
import { publish, removeMatch } from '../matches/matches.sagas';
import { playScore } from '../play/play.sagas';
import { teams } from '../shared/teams/teams.sagas';

export default function* rootSaga() {
    yield [
        teams(),
        logger(),
        loginFlow(),
        routerSaga(),
        publish(),
        removeMatch(),
        playScore(),
    ];
}