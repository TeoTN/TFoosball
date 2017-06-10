import { call, put } from 'redux-saga/effects';
import api from '../api';
import * as UserActions from './user.actions';
import { raiseError } from '../shared/notifier.actions';
import { getCurrentTeam } from '../teams/teams.sagas';

export function* fetchUsers() {
    const currentTeam = yield call(getCurrentTeam);
    const url = api.urls.teamMemberList(currentTeam.id);
    try {
        const response = yield call(api.requests.get, url);
        yield put(UserActions.receiveUsers(response));
    } catch (error) {
        yield put(raiseError(error));
    }
}

export function* fetchUpdateUsers() {
    const currentTeam = yield call(getCurrentTeam);
    const url = api.urls.teamMemberList(currentTeam.id);
    try {
        const response = yield call(api.requests.get, url, {}, 'Failed to fetch users list');
        yield put(UserActions.updateUsers(response));
    } catch (error) {
        yield put(raiseError(error));
    }
}
