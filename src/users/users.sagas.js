import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import api from '../api';
import * as fromUsers from './users.actions';
import { raiseError, showInfo } from '../shared/notifier.actions';
import { getSelectedTeam } from "../teams/teams.reducer";

export function* fetchUsers() {
    const currentTeam = yield select(getSelectedTeam);
    const url = api.urls.teamMemberList(currentTeam.id);
    try {
        yield put(fromUsers.fetchEntities());
        const response = yield call(api.requests.get, url);
        yield put(fromUsers.receiveUsers(response));
    } catch (error) {
        yield put(fromUsers.errorFetchingEntities());
        yield put(raiseError(error));
    }
}

export function* fetchUpdateUsers() {
    const currentTeam = yield select(getSelectedTeam);
    const url = api.urls.teamMemberList(currentTeam.id);
    try {
        yield put(fromUsers.fetchEntities());
        const response = yield call(api.requests.get, url, {}, 'Failed to fetch users list');
        yield put(fromUsers.updateUsers(response));
    } catch (error) {
        yield put(fromUsers.errorFetchingEntities());
        yield put(raiseError(error));
    }
}


export function* emailAutocompletion({input}) {
    if (input.length < 3) {
        yield put(fromUsers.receivedEmailAutocompletion([]));
        return;
    }
    const url = api.urls.playerList();
    const response = yield call(api.requests.get, url, { email_prefix: input }, 'Cannot get email autocompletion');
    const cbData = response.map(player => ({
        value: player.email,
        label: `${player.email} [${player.first_name} ${player.last_name}]`,
    }));
    yield put(fromUsers.receivedEmailAutocompletion(cbData))
}

export function* userInvitation({email}) {
    const currentTeam = yield select(getSelectedTeam);
    const url = api.urls.teamInvite(currentTeam.id);
    try {
        const {message} = yield call(api.requests.post, url, {email}, `Failed to send invitation to ${email}`);
        yield put(showInfo(message));
    } catch(error) {
        yield put(raiseError(error));
    }
}

export function* users() {
    yield [
        takeLatest(fromUsers.FETCH_AUTOCOMPLETION, emailAutocompletion),
        takeEvery(fromUsers.INVITE, userInvitation)
    ];
}
