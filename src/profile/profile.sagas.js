import { call, put } from 'redux-saga/effects';
import api from '../api';
import { receiveUserMatches, receiveProfile } from './profile.actions';
import { raiseError } from '../shared/notifier.actions';

export function* profileMatches({username, page=1}) {
    const url = api.urls.userMatches(username);
    try {
        const matches = yield call(api.requests.get, url, { page });
        yield put(receiveUserMatches(matches));
    } catch (error) {
        yield put(raiseError('Unable to get latest matches.'));
    }
}

export function* profileStats({username}) {
    try {
        const url = api.urls.userEntity(username);
        const profile = yield call(api.requests.get, url, null, `Failed to get ${username} profile.`);
        yield put(receiveProfile(profile));
    } catch (error) {
        yield put(raiseError(error))
    }
}
