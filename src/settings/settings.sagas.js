import { call, take, put, takeLatest } from 'redux-saga/effects';
import api from '../api';
import { REQUEST_SAVE_MEMBER, REQUEST_SAVE_PROFILE, REQUEST_SAVE_SETTINGS, settingsSaved } from './settings.actions';
import { showInfo, raiseError } from '../shared/notifier.actions';
import { getCurrentTeam } from '../teams/teams.sagas';
import { browserHistory } from 'react-router'


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

const profileSettingsFilter = ({ first_name, last_name }) => ({ first_name, last_name });
const memberSettingsFilter = ({ username, hidden }) => ({ username, hidden });

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

export function* saveSettings({values}) {
    const successMsg = 'Profile settings were saved';
    const errorMsg = 'Failed to save profile settings';
    if (values.first_name || values.last_name) { // TODO Remove that stupid thing
        const profileUrl = api.urls.profile();
        const profileSettings = profileSettingsFilter(values);
        yield call(api.requests.patch, profileUrl, profileSettings, errorMsg);
    }

    if (values.username || values.hasOwnProperty('hidden')) { // TODO Remove that stupid thing
        const currentTeam = yield call(getCurrentTeam);
        const memberUrl = api.urls.teamMemberEntity(currentTeam.id, currentTeam.member_id);
        const memberSettings = memberSettingsFilter(values);
        yield call(api.requests.patch, memberUrl, memberSettings, errorMsg);
    }
    yield put(showInfo(successMsg)); // TODO don't do this unless request is OK
    yield put(settingsSaved(values));
    if (values.username) {
        yield call([browserHistory, browserHistory.push], `/profile/${values.username}/settings`);
    }
}

export function* onRequestSaveSettings() {
    const errorMsg = 'Failed to save profile settings';
    try {
        yield takeLatest(REQUEST_SAVE_SETTINGS, saveSettings);
    } catch(error) {
        yield put(raiseError(errorMsg));
        // yield takeLatest(REQUEST_SAVE_SETTINGS, saveSettings);
    }
}

export function* settings() {
    yield [
        saveProfile(),
        saveMember(),
    ];
}
