import { call, take, put, select } from 'redux-saga/effects';
import api from '../api';
import { REQUEST_SAVE_MEMBER, REQUEST_SAVE_PROFILE } from './settings.actions';
import { profileUpdate } from '../profile/profile.actions';
import { raiseError } from '../shared/error.actions';
import { displayInfo } from '../shared/infobar.actions';

const validateMember = (data) => {
    console.log('validate', data);
    if (data.username.length < 3) {
        throw new Error('Username must consist of at least 3 characters.');
    }
    if (data.username.length >= 15) {
        throw new Error('Username must consist of no more than 14 characters.');
    }
    return data;
};

function* saveProfile() {
    const url = api.urls.profile();
    while (true) {
        const action = yield take(REQUEST_SAVE_PROFILE);
        try {
            const response = yield call(api.requests.patch, url, action.partialData, 'Failed to save profile.');
            yield put(profileUpdate(response));
            yield put(displayInfo('Profile changes saved.'))
        } catch(error) {
            yield put(raiseError(error));
        }
    }
}

function* saveMember() {
    while (true) {
        const action = yield take(REQUEST_SAVE_MEMBER);
        console.log(action)
        const username = yield select(state => state.auth.profile.username);
        const url = api.urls.userEntity(username);
        try {
            const data = validateMember(action.partialData);
            const response = yield call(api.requests.patch, url, data, 'Failed to save team member.');
            yield put(profileUpdate(response));
            yield put(displayInfo('Team member profile saved.'))
        } catch(error) {
            yield put(raiseError(error));
        }
    }
}


export function* settings() {
    yield [
        saveProfile(),
        saveMember(),
    ];
}
