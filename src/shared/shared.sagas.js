import {put, call, select, take} from 'redux-saga/effects';
import { clean, raiseError } from './notifier.actions';
import {WHATS_NEW_VERSION} from "../api/config";
import {ACCEPT, showModalInfo} from "./modal.actions";
import api from "../api/index";
import {whatsNewShown} from "./auth/auth.actions";
import {SET_PROFILE} from './auth/auth.types';
import whatsnew from './whatsnew.md';
export function* cleanNotifications() {
    yield put(clean());
}

export function* whatsNewModal() {
    // TODO Extract auth profile selector and cache with reselect
    let profile = yield select(state => state.auth.profile);
    if (!profile) {
        const action = yield take(SET_PROFILE);
        profile = action.response;
    }
    const localWhatsNewVersion = parseInt(profile.whats_new_version) || 0;
    if (localWhatsNewVersion && WHATS_NEW_VERSION > localWhatsNewVersion) {
        return;
    }
    const info = {
        title: `What's new (${WHATS_NEW_VERSION})`,
        text: whatsnew,
        markdown: true,
        onAccept: () => {},
        local: localWhatsNewVersion,
        global: WHATS_NEW_VERSION,
    };
    yield put(showModalInfo(info));
    yield take(ACCEPT);
    yield put(whatsNewShown(WHATS_NEW_VERSION));
    const url = api.urls.playerEntity(profile.user_id);
    try {
        yield call(api.requests.patch, url, {whats_new_version: WHATS_NEW_VERSION});
    } catch (error) {
        yield put(raiseError('Failed to store latest What\'s New version'));
    }
}
