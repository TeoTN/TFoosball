import { call, take, put } from 'redux-saga/effects';
import { PUBLISH, DELETE } from './match.types';
import { sent, list } from './match.actions';
import * as API from '../api/connectors';
import { removed } from './match.actions';
import { raiseError } from '../shared/error.actions';
import { displayInfo } from '../shared/infobar.actions';
import { fetchUsers } from '../users/users.sagas';

export function* publish() {
    const success_msg = points => `Match successfully saved. Red: ${points}, Blue: ${-points}`;

    while (true) {
        const action = yield take(PUBLISH);
        try {
            const response = yield call(API.publishMatch, action.match_data);
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
        try {
            yield call(API.removeMatch, action.id);
            yield put(removed(action.id));
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}

export function* listMatches({page}) {
    try {
        const matches = yield call(API.fetchMatches, page);
        yield put(list(matches));
    } catch (error) {
        yield put(raiseError('Unable to get latest matches.'));
    }
}
