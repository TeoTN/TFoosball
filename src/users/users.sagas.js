import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api';
import * as UserActions from './user.actions';
import { FETCH_AUTOCOMPLETION } from './user.types';
import { raiseError } from '../shared/notifier.actions';
import { getCurrentTeam } from '../teams/teams.sagas';

export function* fetchUsers() {
    const currentTeam = yield call(getCurrentTeam);
    const url = api.urls.teamMemberList(currentTeam.id);
    try {
        const response = yield call(api.requests.get, url);
        yield put(UserActions.receiveUsers(response));
    } catch (error) {
        yield put(raiseError(error));
    }
}

export function* fetchUpdateUsers() {
    const currentTeam = yield call(getCurrentTeam);
    const url = api.urls.teamMemberList(currentTeam.id);
    try {
        const response = yield call(api.requests.get, url, {}, 'Failed to fetch users list');
        yield put(UserActions.updateUsers(response));
    } catch (error) {
        yield put(raiseError(error));
    }
}


export function* emailAutocompletion({input}) {
    if (input.length < 3) {
        yield put(UserActions.receivedEmailAutocompletion([]));
        return;
    }
    const url = api.urls.playerList();
    const response = yield call(api.requests.get, url, { email_prefix: input }, 'Cannot get email autocompletion');
    const cbData = response.map(player => ({
        value: player.email,
        label: `${player.email} [${player.first_name} ${player.last_name}]`,
    }));
    yield put(UserActions.receivedEmailAutocompletion(cbData))
}

export function* users() {
    yield [
        takeLatest(FETCH_AUTOCOMPLETION, emailAutocompletion),
    ];
}
