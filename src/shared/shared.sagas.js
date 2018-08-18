import { put, call, select, take, fork, takeLatest, race } from 'redux-saga/effects';
import { clean, raiseError } from './notifier.actions';
import { WHATS_NEW_VERSION } from "../api/config";
import { ACCEPT, REJECT, showModalInfo } from "./modal.actions";
import api from "../api/index";
import { whatsNewShown } from "../auth/auth.actions";
import { getAuthProfile } from "../auth/auth.reducer";
import { SHOW_WHATS_NEW } from "./shared.actions";

export function* cleanNotifications() {
    yield put(clean());
}

export function* updateWhatsNewVersion(profile) {
    const url = api.urls.playerEntity(profile.user_id);
    try {
        yield call(api.requests.patch, url, {whats_new_version: WHATS_NEW_VERSION});
    } catch (error) {
        yield put(raiseError('Failed to store latest What\'s New version'));
    }
}

export function* showWhatsNewModal(localWhatsNewVersion) {
    const whatsNewUrl = api.urls.whatsNew(WHATS_NEW_VERSION);
        const {content} = yield call(api.requests.get, whatsNewUrl);
        const info = {
            title: `What's new (${WHATS_NEW_VERSION})`,
            text: content,
            isMarkdown: true,
            onAccept: () => {
            },
            local: localWhatsNewVersion,
            global: WHATS_NEW_VERSION,
        };
        yield put(showModalInfo(info));
}

export function* checkWhatsNew() {
    let profile = yield select(getAuthProfile);
    if (!profile || !profile.user_id) {
        return;
    }
    const localWhatsNewVersion = parseInt(profile.whats_new_version, 10) || 0;
    if (localWhatsNewVersion && WHATS_NEW_VERSION <= localWhatsNewVersion) {
        return;
    }
    try {
        yield call(showWhatsNewModal, localWhatsNewVersion);
    } catch (error) {
        yield put(raiseError('Failed to get latest What\'s New information'));
        return;
    }
    yield race({
        accept: take(ACCEPT),
        reject: take(REJECT),
    });
    yield put(whatsNewShown(WHATS_NEW_VERSION));
    yield fork(updateWhatsNewVersion, profile);
}

export function* onShowReleaseNotes() {
    yield takeLatest(SHOW_WHATS_NEW, showWhatsNewModal);
}
