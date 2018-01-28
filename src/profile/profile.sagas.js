import { call, put, select } from 'redux-saga/effects';
import api from '../api';
import { receiveUserMatches, receiveProfile } from './profile.actions';
import {raiseError, showInfo} from '../shared/notifier.actions';
import { getSelectedTeamId } from "../teams/teams.reducer";


export function* profileMatches({username, page=1}) {
    const currentTeamId = yield select(getSelectedTeamId);
    const url = api.urls.teamMatchList(currentTeamId);
    try {
        const matches = yield call(api.requests.get, url, { page, username });
        yield put(receiveUserMatches(matches));
    } catch (error) {
        yield put(raiseError('Unable to get latest matches.'));
    }
}

export function* profileStats({username}) {
    const currentTeamId = yield select(getSelectedTeamId);
    try {
        const url = `${api.urls.teamMemberList(currentTeamId)}?username=${username}`;
        const profiles = yield call(api.requests.get, url, null, `Failed to get ${username} profile.`);
        if (profiles[0].hidden) {
            yield put(showInfo('You have been marked as inactive player. You can change that in profile settings.'));
        }
        yield put(receiveProfile(profiles));
    } catch (error) {
        yield put(raiseError(error))
    }
}
