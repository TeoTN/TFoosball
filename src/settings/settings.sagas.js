import { call, put, select } from 'redux-saga/effects';
import api from '../api';
import { settingsSaved } from './settings.actions';
import { showInfo, raiseError } from '../shared/notifier.actions';
import { browserHistory } from 'react-router'
import { getSelectedTeam } from "../teams/teams.reducer";


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

export function* saveSettings({values}) {
    const successMsg = 'Your settings were saved';
    const errorMsg = 'Failed to save settings';
    const currentTeam = yield select(getSelectedTeam);
    const memberUrl = api.urls.teamMemberEntity(currentTeam.id, currentTeam.member_id);
    try {
        yield call(api.requests.patch, memberUrl, values, errorMsg);
        yield put(showInfo(successMsg));
        yield put(settingsSaved(values));
        if (values.username) {
            yield call([browserHistory, browserHistory.push], `/profile/${values.username}/settings`);
        }
    }
    catch (error) {
        yield put(raiseError(errorMsg));
    }
}
