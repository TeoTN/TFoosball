import { call, put } from 'redux-saga/effects';
import { fetchUserMatches, fetchProfile } from '../api/connectors';
import { receiveUserMatches, receiveProfile } from './profile.actions';
import { raiseError } from '../shared/error.actions';

export function* profileMatches({username}) {
    try {
        const matches = yield call(fetchUserMatches, username);
        yield put(receiveUserMatches(matches));
    } catch (error) {
        yield put(raiseError('Unable to get latest matches.'));
    }
}

export function* profileStats({username}) {
    try {
        const profile = yield call(fetchProfile, username);
        yield put(receiveProfile(profile));
    } catch (error) {
        yield put(raiseError(`Failed to get ${username} profile.`))
    }
}
