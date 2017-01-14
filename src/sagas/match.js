import { call, take, put } from 'redux-saga/effects';
import { PUBLISH, DELETE } from '../actions/match.types';
import { sent } from '../actions/match.actions';
import * as API from '../api/connectors';
import { removed } from '../actions/match.actions';
import { raiseError } from '../actions/error.actions';
import { displayInfo } from '../actions/infobar.actions';
import { fetchUsers } from './users';

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