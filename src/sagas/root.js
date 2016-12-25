import { loginFlow } from './auth';
import { logger } from './logger';
import { routerSaga } from './routes';

export default function* rootSaga() {
    yield [
        logger(),
        loginFlow(),
        routerSaga(),
    ];
}