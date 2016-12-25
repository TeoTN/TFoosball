import { loginFlow } from './auth';

export default function* rootSaga() {
    yield [
        loginFlow(),
    ];
}