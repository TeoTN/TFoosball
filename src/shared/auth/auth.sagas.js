import { take, call, put, select, takeLatest, race } from 'redux-saga/effects';
import { browserHistory } from 'react-router'
import { SIGN_IN, SIGN_OUT } from './auth.types';
import * as authActions from './auth.actions';
import { raiseError, clean, showInfo, RAISE_UNAUTHORIZED } from '../notifier.actions';
import { initTeam, fetchTeams } from '../../teams/teams.sagas';
import { prepareWindow } from '../../api/oauth';
import api from '../../api';
import { removeState } from '../../persistence';
import { getOAuthErrorMsg } from './auth.utils';
import { showModalInfo, ACCEPT, REJECT } from '../modal.actions';
import { getToken } from "./auth.reducer";
import { APIUnauthorizedError } from "../../errors";

export function* authenticate(reauthenticate = false) {
    const token = yield select(getToken);
    if (token && !reauthenticate) return {token};
    const promptWindow = prepareWindow();
    try {
        const {token, expires_at} = yield call([promptWindow, promptWindow.open]);
        yield put(authActions.setToken(token, expires_at));
        return token;
    } catch (error) {
        const errorMsg = getOAuthErrorMsg(error);
        yield put(raiseError(errorMsg));
    }
    return '';
}

export function* fetchProfile(team_id, member_id) {
    const profile_url = api.urls.teamMemberEntity(team_id, member_id);
    try {
        const profile = yield call(api.requests.get, profile_url, {}, 'Failed to load user profile');
        if (profile.hidden) {
            yield put(showInfo('You have been marked as inactive player. You can change that in profile settings.'));
        }
        yield put(authActions.setProfile(profile));
    } catch (error) {
        yield put(raiseError(error));
    }
}

export function* onSignOut() {
    const logout_url = api.urls.logout();
    try {
        yield call(api.requests.get, logout_url, null, 'Failed to sign out. Please try again.');
    } catch (error) {
        if (!error instanceof APIUnauthorizedError) {
            yield put(raiseError(error));
        }
    }
    yield put(authActions.signedOut());
    yield put(clean());
    yield call(removeState);
    yield call([browserHistory, browserHistory.push], '/');
}

export function* onSignIn() {
    const token = yield call(authenticate);
    if (!token) {
        return;
    }
    yield call(fetchTeams);
    const currentTeam = yield call(initTeam);
    if (!currentTeam) {
        // User is not assigned to any team and we were redirected to /welcome page
        return;
    }
    yield call(fetchProfile, currentTeam.id, currentTeam.member_id);
    yield call([browserHistory, browserHistory.push], `/match`);
}

export function* onSessionExpired() {
    // TODO replay
    const info = {
        title: 'Unauthenticated',
        text: 'Your session has expired, please log in again.',
        onAccept: () => {
        },
    };
    yield put(showModalInfo(info));
    yield race({
        accept: take(ACCEPT),
        reject: take(REJECT),
    });
    yield call(removeState);
    yield put(authActions.signOut());
}

export function* acceptInvitation({activation_code}) {
    const token = yield select(getToken);

    if (!token) {
        yield call(authenticate, false);
    }
    const url = api.urls.teamAccept();
    yield put(authActions.activateRequest());
    try {
        yield call(api.requests.post, url, {activation_code}, 'Failed to activate with given code.');
    } catch (error) {
        yield put(raiseError(error));
        yield put(authActions.activateFailure());
        return;
    }
    yield put(authActions.activateSuccess());
    yield call(fetchTeams);
    const currentTeam = yield call(initTeam);
    yield call(fetchProfile, currentTeam.id, currentTeam.member_id);
    yield call([browserHistory, browserHistory.push], '/');
}

export function* checkSessionExpired() {
    const token = yield select(getToken);
    if (!token) {
        return;
    }
    const url = api.urls.root();
    try {
        yield call(api.requests.get, url);
    } catch (error) {
        yield put(raiseError(error));
    }
}

export function* authSaga() {
    yield [
        checkSessionExpired(),
        takeLatest(RAISE_UNAUTHORIZED, onSessionExpired),
        takeLatest(SIGN_IN, onSignIn),
        takeLatest(SIGN_OUT, onSignOut),
    ];
}
