import { all, call, put, race, select, take, takeLatest, fork } from 'redux-saga/effects';
import { delay } from "../utils/delay";
import * as authActions from './auth.actions';
import { RAISE_UNAUTHORIZED, raiseError, showInfo } from '../shared/notifier.actions';
import { fetchTeams, initTeam } from '../teams/teams.sagas';
import api from '../api/index';
import { removeState } from '../persistence';
import { ACCEPT, REJECT, showModalInfo } from '../shared/modal.actions';
import { selectAuthState, selectToken } from "./auth.selectors";
import { APIUnauthorizedError } from "../errors";
import { SIGN_IN, SIGN_OUT } from "./auth.types";
import { redir } from "../utils/redir.effect";
import { exchangeTokenRequestBody, signOutRequestBody } from "./auth.constants";


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
    const token = yield select(selectToken);
    const body = { ...signOutRequestBody, token };
    try {
        yield call(api.requests.post, logout_url, body, 'Failed to sign out. Please try again.');
    } catch (error) {
        if (!error instanceof APIUnauthorizedError) {
            yield put(raiseError(error));
        }
    }
    yield put(authActions.signedOut());
    yield call(removeState);
    yield redir('/');
}

export function* obtainToken(url, body) {
    const response = yield call(api.requests.obtainToken, url, body);
    console.log('%cObtain', 'color: red', response);
    const { expires_in, access_token, refresh_token } = response;
    const expiresAt = Math.round(Date.now() / 1000) + expires_in;
    yield put(authActions.setToken(access_token, expiresAt, refresh_token));
}

export function* onGoogleAuthenticated({ payload }) {
    const { name, email, imageUrl, Zi: { access_token: googleToken } } = payload;
    localStorage.setItem('name', name);
    localStorage.setItem('imageUrl', imageUrl);
    if (!googleToken) {
        yield put(raiseError('Failed to authenticate with Google'));
    }
    // Exchange token
    const url = api.urls.convertToken();
    const body = { ...exchangeTokenRequestBody, token: googleToken };
    try {
        yield call(obtainToken, url, body)
    } catch (error) {
        yield put(raiseError(`Failed to authenticate user ${email}`));
    }
}

export function* onSignIn(action) {
    yield call(onGoogleAuthenticated, action);
    yield call(fetchTeams);
    const currentTeam = yield call(initTeam);
    if (!currentTeam) {
        // User is not assigned to any team and we were redirected to /welcome page
        return;
    }
    yield call(fetchProfile, currentTeam.id, currentTeam.member_id);
    yield redir(`/match`);
}

export function* refreshToken() {
    const { refreshToken, expires_at, token } = yield select(selectAuthState);
    if (!token) {
        return;
    }
    if (!refreshToken) {
        throw new Error('Missing refresh token');
    }
    const currentTime = Math.round(Date.now() / 1000);
    if (expires_at && expires_at - currentTime <= 0) {
        throw new Error('Token expired');
    }
    if (expires_at && expires_at - currentTime <= 36000) {
        const url = api.urls.refreshToken();
        const body = {
            ...exchangeTokenRequestBody,
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        };
        yield call(obtainToken, url, body);
    }
}

export function* invalidateSession() {
    // TODO replay latest request - `call()` can be stored
    try {
        yield call(refreshToken);
    } catch (e) {
        const info = {
            title: 'Unauthenticated',
            text: 'Your session has expired, please log in again.',
            onAccept: () => {},
        };
        yield put(showModalInfo(info));
        yield race({ accept: take(ACCEPT), reject: take(REJECT) });
        yield call(removeState);
        yield put(authActions.signOut());
    }
}

export function* shouldRefreshToken() {
    while (true) {
        yield call(delay, 60 * 1000); // Debounce for 15 min
        yield call(invalidateSession);
    }
}

export function* authSaga() {
    yield all([
        fork(shouldRefreshToken),
        takeLatest(RAISE_UNAUTHORIZED, invalidateSession),
        takeLatest(SIGN_IN, onSignIn),
        takeLatest(SIGN_OUT, onSignOut),
    ]);
}
