import { call, put } from 'redux-saga/effects';
import { fetchUserMatches } from '../api/connectors';
import { receiveUserMatches } from '../actions/profile.actions';

export function* profileMatches({username}) {
    const matches = yield call(fetchUserMatches, username);
    yield put(receiveUserMatches(matches));
}
