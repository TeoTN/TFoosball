import { loginFlow } from '../shared/auth.sagas';
import { logger } from '../shared/logger.sagas';
import { routerSaga } from '../shared/routes.sagas';
import { publish, removeMatch } from '../matches/matches.sagas';
import { playScore } from '../play/play.sagas';
import { teamCreationFlow } from '../shared/teams.sagas';

export default function* rootSaga() {
    yield [
        teamCreationFlow(),
        logger(),
        loginFlow(),
        routerSaga(),
        publish(),
        removeMatch(),
        playScore(),
    ];
}