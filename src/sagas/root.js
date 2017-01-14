import { loginFlow } from './auth';
import { logger } from './logger';
import { routerSaga } from './routes';
import { publish } from './match';

export default function* rootSaga() {
    yield [
        logger(),
        loginFlow(),
        routerSaga(),
        publish(),
    ];
}