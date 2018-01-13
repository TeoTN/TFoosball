import { call, put, select } from 'redux-saga/effects';
import api from '../api';
import * as fromUsers from './users.actions';
import { raiseError } from '../shared/notifier.actions';
import { getSelectedTeam } from "../teams/teams.reducer";

export function* fetchUsers() {
    const currentTeam = yield select(getSelectedTeam);
    const url = api.urls.teamMemberList(currentTeam.id);
    try {
        yield put(fromUsers.fetchEntities());
        const response = yield call(api.requests.get, url);
        yield put(fromUsers.receiveUsers(response));
    } catch (error) {
        yield put(fromUsers.errorFetchingEntities());
        yield put(raiseError(error));
    }
}

export function* fetchUpdateUsers() {
    const currentTeam = yield select(getSelectedTeam);
    const url = api.urls.teamMemberList(currentTeam.id);
    try {
        yield put(fromUsers.fetchEntities());
        const response = yield call(api.requests.get, url, {}, 'Failed to fetch users list');
        yield put(fromUsers.updateUsers(response));
    } catch (error) {
        yield put(fromUsers.errorFetchingEntities());
        yield put(raiseError(error));
    }
}
