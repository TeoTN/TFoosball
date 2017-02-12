import { call, take, put } from 'redux-saga/effects';
import { PUBLISH, DELETE } from './match.types';
import { sent, list } from './match.actions';
import api from '../api';
import { removed } from './match.actions';
import { raiseError } from '../shared/error.actions';
import { displayInfo } from '../shared/infobar.actions';
import { fetchUsers } from '../users/users.sagas';

export function* publish() {
    const success_msg = points => `Match successfully saved. Red: ${points}, Blue: ${-points}`;
    while (true) {
        const action = yield take(PUBLISH);
        const url = api.urls.matchList();
        try {
            const response = yield call(api.requests.post, url, action.match_data, 'Failed to send match to server');
            yield put(sent(response));
            yield put(displayInfo(success_msg(response.points)));
            yield call(fetchUsers);
            yield call(action.callback);
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}

export function* removeMatch() {
    while (true) {
        const action = yield take(DELETE);
        const url = api.urls.matchEntity(action.id);
        try {
            yield call(api.requests['delete'], url);
            yield put(removed(action.id));
        } catch (error) {
            console.error(error);
            yield put(raiseError(error));
        }
    }
}

export function* listMatches({page}) {
    const url = api.urls.matchList();
    try {
        const matches = yield call(api.requests.get, url, { page });
        yield put(list(matches));
    } catch (error) {
        yield put(raiseError('Failed to retrieve a list of matches.'));
    }
}
