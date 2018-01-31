import { authSaga } from '../shared/auth/auth.sagas';
import { logger } from '../shared/logger.sagas';
import { routerSaga } from '../shared/routes.sagas';
import { publish, removeMatch } from '../matches/matches.sagas';
import { playScore } from '../play/play.sagas';
import { saveSettings } from '../settings/settings.sagas';
import { takeLatest } from "redux-saga/effects";
import { REQUEST_SAVE_SETTINGS } from "../settings/settings.actions";

export default function* rootSaga() {
    yield [
        logger(),
        authSaga(),
        takeLatest(REQUEST_SAVE_SETTINGS, saveSettings),
        routerSaga(),
        publish(),
        removeMatch(),
        playScore(),
    ];
}
