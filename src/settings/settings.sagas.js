import { call, take, put } from 'redux-saga/effects';
import api from '../api';
import { REQUEST_SAVE_MEMBER, REQUEST_SAVE_PROFILE } from './settings.actions';
import { showInfo, raiseError } from '../shared/notifier.actions';
import { fetchPendingMembers, getCurrentTeam } from '../shared/teams/teams.sagas';

// TODO move it somewhere
export const validateMember = (data) => {
    if (data.username.length < 3) {
        throw new Error('Username must consist of at least 3 characters.');
    }
    if (data.username.length >= 15) {
        throw new Error('Username must consist of no more than 14 characters.');
    }
    return data;
};

export function* saveProfile() {
    const url = api.urls.profile();
    while (true) {
        const action = yield take(REQUEST_SAVE_PROFILE);
        try {
            yield call(api.requests.patch, url, action.partialData, 'Failed to save profile.');
            yield put(showInfo('Profile changes saved.'))
        } catch(error) {
            yield put(raiseError(error));
        }
    }
}

export function* saveMember() {
    while (true) {
        const action = yield take(REQUEST_SAVE_MEMBER);
        const currentTeam = yield call(getCurrentTeam);
        const url = api.urls.teamMemberEntity(currentTeam.id, currentTeam.member_id);
        try {
            const data = validateMember(action.partialData);
            yield call(api.requests.patch, url, data, 'Failed to save team member.');
            yield put(showInfo('Team member profile saved.'))
        } catch(error) {
            yield put(raiseError(error));
        }
    }
}

export function* settings() {
    yield [
        saveProfile(),
        saveMember(),
        fetchPendingMembers(),
    ];
}
