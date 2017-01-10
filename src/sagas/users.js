import { call, put } from 'redux-saga/effects';
import * as API from '../api/connectors';
import * as UserActions from '../actions/user.actions';
import * as ErrorActions from '../actions/error.actions';

export function* fetchUsers() {
    try {
        const response = yield call(API.fetchUsers);
        yield put(UserActions.receiveUsers(response));
    } catch (error) {
        yield put(ErrorActions.raiseError(error));
    }
}
