import { call, put, select } from 'redux-saga/effects';
import api from '../api';
import { receiveUserMatches, receiveProfile } from './profile.actions';
import { raiseError } from '../shared/notifier.actions';


export function* profileMatches({username, page=1}) {
    const currentTeamId = yield select(state => state.teams.selected);
    const url = api.urls.teamMatchList(currentTeamId);
    try {
        const matches = yield call(api.requests.get, url, { page, username });
        yield put(receiveUserMatches(matches));
    } catch (error) {
        yield put(raiseError('Unable to get latest matches.'));
    }
}

export function* profileStats({username}) {
    const currentTeamId = yield select(state => state.teams.selected);
    try {
        const url = `${api.urls.teamMemberList(currentTeamId)}?username=${username}`;
        const profiles = yield call(api.requests.get, url, null, `Failed to get ${username} profile.`);
        yield put(receiveProfile(profiles));
    } catch (error) {
        yield put(raiseError(error))
    }
}
