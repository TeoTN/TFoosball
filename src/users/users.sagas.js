import { call, put } from 'redux-saga/effects';
import * as API from '../api/connectors';
import * as UserActions from './user.actions';
import * as ErrorActions from '../shared/error.actions';

export function* fetchUsers() {
    try {
        const response = yield call(API.fetchUsers);
        yield put(UserActions.receiveUsers(response));
    } catch (error) {
        yield put(ErrorActions.raiseError(error));
    }
}
