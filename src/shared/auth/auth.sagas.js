import { take, call, put, fork, cancel, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router'
import { SIGN_IN, SIGN_OUT } from './auth.types';
import { setToken, setProfile, signedOut } from './auth.actions';
import { raiseError, clean } from '../notifier.actions';
import { initTeam, fetchTeams } from '../teams/teams.sagas';
import { prepareWindow } from '../../api/oauth';
import api from '../../api';
import { removeState } from '../../persistence';
import { getOAuthErrorMsg } from './auth.utils';

export function* authenticate() {
    const token = yield select(state => state.auth.token);
    if (token) return { token };
    const promptWindow = prepareWindow();
    try {
        const { token } = yield call([promptWindow, promptWindow.open]);
        yield put(setToken(token));
        return { token };
    } catch (error) {
        const errorMsg = getOAuthErrorMsg(error);
        yield put(raiseError(errorMsg));
    }
    return {};
}

export function* fetchProfile(team_id, member_id) {
    const profile_url = api.urls.teamMemberEntity(team_id, member_id);
    try {
        const profile = yield call(api.requests.get, profile_url, {}, 'Failed to load user profile');
        yield put(setProfile(profile));
    } catch(error) {
        yield put(raiseError(error));
    }
}

export function* signIn() {
    yield take(SIGN_IN);
    yield call(authenticate);
    yield call(fetchTeams);
    const currentTeam = yield call(initTeam);
    if (!currentTeam) {
        // User is not assigned to any team and we were redirected to /welcome page
        return;
    }
    // try {
    yield call(fetchProfile, currentTeam.id, currentTeam.member_id);
    // } catch (error) {
        // TODO What if the entry belongs to the other user that was previously logged in?
        // yield call(removeTeamState);
        // yield chooseTeam();
        // yield fetchProfile();
        // console.error(error);
    // }
    yield call([browserHistory, browserHistory.push], `/match`);
}

export function* loginFlow() {
    while (true) {
        const task = yield fork(signIn);
        yield take(SIGN_OUT);
        yield cancel(task);
        const logout_url = api.urls.logout();
        try {
            yield call(api.requests.get, logout_url, null, 'Failed to sign out. Please try again.');
        } catch (error) {
            yield put(raiseError(error));
            continue;
        }
        yield put(signedOut());
        yield put(clean());
        yield call(removeState);
        yield call([browserHistory, browserHistory.push], '/');
    }
}
