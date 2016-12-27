import { call, put } from 'redux-saga/effects';
import { fetchUserMatches, fetchProfile } from '../api/connectors';
import { receiveUserMatches, receiveProfile } from '../actions/profile.actions';
import { raiseError } from '../actions/error.actions';

export function* profileMatches({username}) {
    const matches = yield call(fetchUserMatches, username);
    if (matches) {
        yield put(receiveUserMatches(matches));
    } else {
        yield put(raiseError('Unable to get latest matches.'));
    }
}

export function* profileStats({username}) {
    const profile = yield call(fetchProfile, username);
    if (profile) {
        yield put(receiveProfile(profile));
    } else {
        yield put(raiseError(`Failed to get ${username} profile.`))
    }
}
