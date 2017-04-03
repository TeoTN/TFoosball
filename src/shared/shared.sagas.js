import { put } from 'redux-saga/effects';
import { clean } from './notifier.actions';

export function* cleanNotifications() {
    yield put(clean());
}
