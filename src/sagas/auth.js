import { take, call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router'
import { SIGN_IN, SIGN_OUT } from '../actions/auth.types';
import { setToken, setProfile, signedOut } from '../actions/auth.actions';
import { raiseError } from '../actions/error.actions';
import { prepareWindow } from '../api/oauth';
import { fetchProfile, fetchLogout } from '../api/connectors';

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
    const { token } = yield call([promptWindow, promptWindow.open]);
        yield put(setToken(token));
        return token;
    } catch (error) {
        console.error(error);
        const errorMsg = getOAuthErrorMsg(error);
        yield put(raiseError(errorMsg));
    }
}

export function* loginFlow() {
    while (true) {
        yield take(SIGN_IN);
        const token = yield call(openOAuthWindow);
        if (!token) continue;
        try {
            const response = yield call(fetchProfile);
            yield put(setProfile(response));
            browserHistory.push('/match');
            yield take(SIGN_OUT);
            yield call(fetchLogout);
            yield put(signedOut());
            browserHistory.push('/');
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}