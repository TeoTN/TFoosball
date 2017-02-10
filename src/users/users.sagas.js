import { call, put } from 'redux-saga/effects';
import api from '../api';
import * as UserActions from './user.actions';
import * as ErrorActions from '../shared/error.actions';

export function* fetchUsers() {
    const url = api.urls.userList();
    try {
        const response = yield call(api.requests.get, url);
        yield put(UserActions.receiveUsers(response));
    } catch (error) {
        yield put(ErrorActions.raiseError(error));
    }
}
