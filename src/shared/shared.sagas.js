import {put, call, select, take, fork} from 'redux-saga/effects';
import { clean, raiseError } from './notifier.actions';
import {WHATS_NEW_VERSION} from "../api/config";
import {ACCEPT, showModalInfo} from "./modal.actions";
import api from "../api/index";
import {whatsNewShown} from "./auth/auth.actions";
import {SET_PROFILE} from './auth/auth.types';
import { getAuthProfile } from "./auth/auth.reducer";

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

export function* whatsNewModal() {
    // TODO Extract auth profile selector and cache with reselect
    let profile = yield select(getAuthProfile);
    if (!profile) {
        const action = yield take(SET_PROFILE);
        profile = action.response;
    }
    const localWhatsNewVersion = parseInt(profile.whats_new_version, 10) || 0;
    if (localWhatsNewVersion && WHATS_NEW_VERSION <= localWhatsNewVersion) {
        return;
    }
    const whatsNewUrl = api.urls.whatsNew(WHATS_NEW_VERSION);
    try {
        const {content} = yield call(api.requests.get, whatsNewUrl);
        const info = {
            title: `What's new (${WHATS_NEW_VERSION})`,
            text: content,
            isMarkdown: true,
            onAccept: () => {},
            local: localWhatsNewVersion,
            global: WHATS_NEW_VERSION,
        };
        yield put(showModalInfo(info));
    } catch (error) {
        yield put(raiseError('Failed to get latest What\'s New information'));
        return;
    }
    yield take(ACCEPT);
    yield put(whatsNewShown(WHATS_NEW_VERSION));
    yield fork(updateWhatsNewVersion, profile);
}

