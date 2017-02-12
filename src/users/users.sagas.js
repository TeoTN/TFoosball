import { call, put } from 'redux-saga/effects';
import api from '../api';
import * as UserActions from './user.actions';
import { raiseError } from '../shared/notifier.actions';

export function* fetchUsers() {
    const url = api.urls.userList();
    try {
        const response = yield call(api.requests.get, url);
        yield put(UserActions.receiveUsers(response));
    } catch (error) {
        yield put(raiseError(error));
    }
}
