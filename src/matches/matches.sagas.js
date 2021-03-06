import { call, take, put, select } from 'redux-saga/effects';
import { PUBLISH, DELETE } from './match.types';
import { sent, list } from './match.actions';
import api from '../api';
import { removed } from './match.actions';
import { showInfo, raiseError } from '../shared/notifier.actions';
import { fetchUpdateUsers } from '../users/users.sagas';
import { getSelectedTeamId } from "../teams/teams.reducer";

// TODO Use takeEvery & consider moving to play sagas
export function* publish() {
    const success_msg = points => `Match successfully saved. Red: ${points}, Blue: ${-points}`;
    while (true) {
        const action = yield take(PUBLISH);
        const currentTeamId = yield select(getSelectedTeamId);
        const url = api.urls.teamMatchList(currentTeamId);
        try {
            const response = yield call(api.requests.post, url, action.match_data, 'Failed to send match to server');
            yield put(sent(response));
            yield put(showInfo(success_msg(response.points)));
            yield call(fetchUpdateUsers);
            yield call(action.callback);
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}

export function* removeMatch() {
    while (true) {
        const action = yield take(DELETE);
        const currentTeamId = yield select(getSelectedTeamId);
        const url = api.urls.teamMatchEntity(currentTeamId, action.id);
        try {
            yield call(api.requests['delete'], url);
            yield put(removed(action.id));
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}

export function* listMatches({page}) {
    const currentTeamId = yield select(getSelectedTeamId);
    const url = api.urls.teamMatchList(currentTeamId);
    try {
        const matches = yield call(api.requests.get, url, { page }, 'Failed to retrieve a list of matches.');
        yield put(list(matches));
    } catch (error) {
        yield put(raiseError(error));
    }
}
