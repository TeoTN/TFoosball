import { authSaga } from '../auth/auth.sagas';
import { logger } from '../shared/logger.sagas';
import { routerSaga } from '../shared/routes.sagas';
import { matchesSaga } from '../matches/matches.sagas';
import { playScore } from '../play/play.sagas';
import { saveSettings } from '../settings/settings.sagas';
import { takeLatest } from "redux-saga/effects";
import { REQUEST_SAVE_SETTINGS } from "../settings/settings.actions";
import { onShowReleaseNotes } from "../shared/shared.sagas";

export default function* rootSaga() {
    yield [
        logger(),
        authSaga(),
        takeLatest(REQUEST_SAVE_SETTINGS, saveSettings),
        routerSaga(),
        matchesSaga(),
        playScore(),
        onShowReleaseNotes(),
    ];
}
