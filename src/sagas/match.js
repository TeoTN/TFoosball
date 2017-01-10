import { call, take, put } from 'redux-saga/effects';
import { PUBLISH } from '../actions/match.types';
import { sent } from '../actions/match.actions';
import { publishMatch } from '../api/connectors';
import { raiseError } from '../actions/error.actions';
import { displayInfo } from '../actions/infobar.actions';
import { fetchUsers } from './users';

export function* publish() {
    const success_msg = points => `Match successfully saved. Red: ${points}, Blue: ${-points}`;

    while (true) {
        const action = yield take(PUBLISH);
        try {
            const response = yield call(publishMatch, action.match_data);
            yield put(sent(response));
            yield put(displayInfo(success_msg(response.points)));
            yield fetchUsers();
            yield call(action.callback);
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}

