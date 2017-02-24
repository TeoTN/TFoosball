import { call, put, select } from 'redux-saga/effects';
import api from '../api';
import * as UserActions from './user.actions';
import { raiseError } from '../shared/notifier.actions';

export function* fetchUsers() {
    const currentTeamId = yield select(state => state.teams.selected);
    const url = api.urls.teamMemberList(currentTeamId);
    try {
        const response = yield call(api.requests.get, url);
        yield put(UserActions.receiveUsers(response));
    } catch (error) {
        yield put(raiseError(error));
    }
}

export function* fetchUpdateUsers() {
    const currentTeamId = yield select(state => state.teams.selected);
    const url = api.urls.teamMemberList(currentTeamId);
    try {
        const response = yield call(api.requests.get, url);
        yield put(UserActions.updateUsers(response));
    } catch (error) {
        yield put(raiseError(error));
    }
};
