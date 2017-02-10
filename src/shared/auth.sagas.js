import { take, call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router'
import { SIGN_IN, SIGN_OUT } from './auth.types';
import { setTeams } from '../profile/profile.actions';
import { setToken, setProfile, signedOut } from './auth.actions';
import { raiseError } from './error.actions';
import { prepareWindow } from '../api/oauth';
import { saveTeamState } from '../persistence';
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
        console.log("openOAuthWindow teams:", teams)
        yield put(setToken(token));
        yield put(setTeams(teams));
        return { token, teams };
    } catch (error) {
        const errorMsg = getOAuthErrorMsg(error);
        yield put(raiseError(errorMsg));
    }
}

export function* loginFlow() {
    const profile_url = api.urls.profile();
    const logout_url = api.urls.logout();
    while (true) {
        yield take(SIGN_IN);
        const { token, teams } = yield call(openOAuthWindow);
        if (!token) continue;
        yield call(saveTeamState, {domain: teams[0]});
        browserHistory.push(`/match`);
        try {
            const profile = yield call(api.requests.get, profile_url, {}, 'Failed to load user profile');
            yield put(setProfile(profile));
            yield take(SIGN_OUT);
            yield call(api.requests.get, logout_url);
            yield put(signedOut());
            browserHistory.push('/');
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}