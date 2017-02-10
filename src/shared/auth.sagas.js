import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { browserHistory } from 'react-router'
import { SIGN_IN, SIGN_OUT } from './auth.types';
import { setTeams } from '../profile/profile.actions';
import { setToken, setProfile, signedOut } from './auth.actions';
import { raiseError } from './error.actions';
import { prepareWindow } from '../api/oauth';
import { saveTeamState, loadTeamState } from '../persistence';
import api from '../api';

export const getOAuthErrorMsg = (error) => {
    switch(error) {
        case 'blocked':
            return 'Authentication window was blocked. Please, try again.';
        case 'closed':
            return 'Authentication window was closed. Please, try again.';
        case 'failure':
            return 'Failed to log in.';
        default:
            return 'Failed to authenticate.';
    }
};

export function* openOAuthWindow() {
    const promptWindow = prepareWindow();
    try {
        const { token, teams } = yield call([promptWindow, promptWindow.open]);
        yield put(setToken(token));
        yield put(setTeams(teams));
        return { token, teams };
    } catch (error) {
        const errorMsg = getOAuthErrorMsg(error);
        yield put(raiseError(errorMsg));
    }
}

function* authenticate(profile_url) {
    yield take(SIGN_IN);
    const {teams} = yield call(openOAuthWindow);
    const currentTeam = yield call(loadTeamState);
    if (!currentTeam) {
        yield call(saveTeamState, { domain: teams[0][0], name: teams[0][1] });
    }
    browserHistory.push(`/match`);
    try {
        const profile = yield call(api.requests.get, profile_url, {}, 'Failed to load user profile');
        yield put(setProfile(profile));
    } catch (error) {
        yield put(raiseError(error));
    }
}

export function* loginFlow() {
    const profile_url = api.urls.profile();
    const logout_url = api.urls.logout();
    while (true) {
        const task = yield fork(authenticate, profile_url);
        try {
            yield take(SIGN_OUT);
            yield cancel(task);
            yield call(api.requests.get, logout_url, null, 'Failed to sign out. Please try again.');
            yield put(signedOut());
            browserHistory.push('/');
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}
