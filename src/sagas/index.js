import { loginFlow } from './auth';
import { logger } from './logger';

export default function* rootSaga() {
    yield [
        logger(),
        loginFlow(),
    ];
}