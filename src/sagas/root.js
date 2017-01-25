import { loginFlow } from './auth';
import { logger } from './logger';
import { routerSaga } from './routes';
import { publish, removeMatch } from './match';
import { websockets } from './websockets';

export default function* rootSaga() {
    yield [
        logger(),
        loginFlow(),
        routerSaga(),
        publish(),
        removeMatch(),
        websockets(),
    ];
}