import { take, call, put, fork, cancel, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router'
import { SIGN_IN, SIGN_OUT } from './auth.types';
import { setToken, setProfile, signedOut } from './auth.actions';
import { setTeams } from './teams/teams.actions';
import { raiseError, clean } from './notifier.actions';
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

export function* authenticate() {
    const alreadyAuthenticated = yield select(state => !!state.auth.token);
    if (alreadyAuthenticated) return {};
    const promptWindow = prepareWindow();
    try {
        const { token, teams } = yield call([promptWindow, promptWindow.open]);
        yield put(setToken(token));
        yield put(setTeams(teams.map(([domain, name]) => ({ domain, name }))));
        return { token, teams };
    } catch (error) {
        const errorMsg = getOAuthErrorMsg(error);
        yield put(raiseError(errorMsg));
        // TODO STOP
    }
}

export function* fetchProfile() {
    const profile_url = api.urls.profile();
    const profile = yield call(api.requests.get, profile_url, {}, 'Failed to load user profile');
    yield put(setProfile(profile));
}

function* signIn() {
    yield take(SIGN_IN);
    const auth = yield authenticate();
    const currentTeam = yield call(loadTeamState);
    if (!auth.teams) {
        browserHistory.push('/welcome');
        return;
    }
    if (!currentTeam && auth.hasOwnProperty('teams')) {
        const team = { domain: auth.teams[0][0], name: auth.teams[0][1] };
        yield call(saveTeamState, team);
    }
    try {
        yield fetchProfile();
    } catch (error) {
        // What if the entry belongs to the other user that was previously logged in?
        const team = { domain: auth.teams[0][0], name: auth.teams[0][1] };
        yield call(saveTeamState, team);
        yield fetchProfile();
    }
    browserHistory.push(`/match`);
}

export function* loginFlow() {
    while (true) {
        const task = yield fork(signIn);
        try {
            yield take(SIGN_OUT);
            yield cancel(task);
            const logout_url = api.urls.logout();
            yield call(api.requests.get, logout_url, null, 'Failed to sign out. Please try again.');
            yield put(signedOut());
            yield put(clean());
            browserHistory.push('/');
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}
