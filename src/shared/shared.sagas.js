import {put, call, select, take} from 'redux-saga/effects';
import {clean} from './notifier.actions';
import {WHATS_NEW_VERSION} from "../api/config";
import {ACCEPT, showModalInfo} from "./modal.actions";
import api from "../api/index";
import {whatsNewShown} from "./auth/auth.actions";

export function* cleanNotifications() {
    yield put(clean());
}

export function* whatsNewModal() {
    const profile = yield select(state => state.auth.profile);
    if (profile.whats_new_version && WHATS_NEW_VERSION <= profile.whats_new_version) {
        return;
    }
    const info = {
        title: `What's new (${WHATS_NEW_VERSION})`,
        text: `• Added What's new modal,
        • Email invitations (See Profile > Teams > Invite section)
        • Hidden players:
            - Notify user when hidden
            - Add setting to unhide yourself
        • Adjust profile view to mobile
        • Complete redesign of homepage
        • Remove old \`/settings\` page
        • Show current team on new match page
        • Fix new match bug on mobile
        • Fix infinite authentication loop bug
        • Fix match deletion permissions bug
        `,
        onAccept: () => {
        },
    };
    yield put(showModalInfo(info));
    yield take(ACCEPT);
    yield put(whatsNewShown(WHATS_NEW_VERSION));
    const url = api.urls.playerEntity(profile.user_id);
    try {
        yield call(api.requests.patch, url, {whats_new_version: WHATS_NEW_VERSION});
    } catch (error) {
        // yield put(raiseError('Failed to update profile'));
    }
}
