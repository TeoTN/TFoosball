import { call, take, put, select, takeEvery } from 'redux-saga/effects';
import {
    REQUEST_CREATE_TEAM,
    REQUEST_JOIN_TEAM,
    SELECT_TEAM,
    MEMBER_ACCEPTANCE,
    LEAVE_TEAM,
    teamCreated,
    setTeams,
    selectTeam,
    setPendingMembers,
    teamLeft,
} from './teams.actions.js';
import api from '../api';
import { showInfo, raiseError } from '../shared/notifier.actions';
import { authenticate, fetchProfile } from '../shared/auth/auth.sagas';
import { validateMember } from '../settings/settings.sagas';
import { browserHistory } from 'react-router';
import { getSelectedTeam } from './teams.reducer';
import { showQuestionModal } from '../shared/modal.actions';


export const stateTokenSelector = state => state.hasOwnProperty('auth') && state.auth.hasOwnProperty('token');
export const stateTeamsSelector = state => state.hasOwnProperty('teams') ? state.teams : [];

export function* getCurrentTeam() {
    const teamsState = yield select(stateTeamsSelector);
    return getSelectedTeam(teamsState);
}

export function* handleSelectTeam() {
    while (true) {
        const { team } = yield take(SELECT_TEAM);
        yield call(fetchProfile, team.id, team.member_id);
        yield call([browserHistory, browserHistory.push], `/profile/${team.username}/teams`);
    }
}

export function* createTeam(action) {
    const url = api.urls.teamList();
    const data = validateMember({
        name: action.name,
        username: action.username,
    });
    let response = {};
    try {
        response = yield call(api.requests.post, url, data, 'Team already exists');
    } catch (error) {
        yield put(raiseError(error));
        return response;
    }
    yield put(teamCreated(response));
    yield put(showInfo(`Team ${action.name} created.`));
    yield put(selectTeam(response));
    return response;
}

export function* leaveTeam() {
    const leave = function* ({team}) {
        const url = api.urls.teamMemberEntity(team.id, team.member_id);
        try {
            yield call(api.requests['delete'], url, {}, `Failed to leave the team ${team.name}.`);
        } catch (error) {
            yield put(raiseError(error));
        }
        yield put(teamLeft(team));
        yield put(showInfo(`Team ${team.name} was left.`));
    };
    yield takeEvery(LEAVE_TEAM, leave);
}

export function* teamCreationFlow() {
    while (true) {
        const action = yield take(REQUEST_CREATE_TEAM);
        // TODO First validate form data
        yield call(authenticate); // TODO check if not authenticated within this generator itself
        const team = yield call(createTeam, action);
        yield call(fetchTeams);
        yield call(fetchProfile, team.id, team.member_id); // TODO Should not get there if failed during any previous steps
        yield call([browserHistory, browserHistory.push], '/match');
    }
}

export function* fetchTeams() {
    const alreadyAuthenticated = yield select(stateTokenSelector);
    if (!alreadyAuthenticated) return;
    const url = api.urls.teamListJoined();
    try {
        const response = yield call(api.requests.get, url, {}, 'Failed to fetch user teams');
        yield put(setTeams(response));
    } catch (error) {
        yield put(raiseError(error))
    }
}

export function* initTeam() {
    const teamsState = yield select(stateTeamsSelector);
    let currentTeam = getSelectedTeam(teamsState);
    if (teamsState.joined.length === 0) {
        yield call([browserHistory, browserHistory.push], '/welcome');
        return;
    }
    if (!currentTeam) {
        currentTeam = teamsState.joined[0];
    }
    yield put(selectTeam(currentTeam));
    return currentTeam;
}

export function* handleJoinTeam() {
    while (true) {
        const action = yield take(REQUEST_JOIN_TEAM);
        const url = api.urls.teamJoin();
        try {
            const errorMsg = 'Team doesn\'t exist or username already taken';
            const response = yield call(api.requests.post, url, action.data, errorMsg);
            yield put(showQuestionModal({
                title: 'Notice',
                text: response,
                onAccept: () => {},
            }));
        } catch(error) {
            yield put(raiseError(error));
        }
    }
}

export function* fetchPendingMembers() {
    const errorMsg = 'Failed to fetch pending members';
    const currentTeam = yield call(getCurrentTeam);
    const url = api.urls.teamMemberList(currentTeam.id);
    try {
        const response = yield call(api.requests.get, url, { is_accepted: 'False' }, errorMsg);
        yield put(setPendingMembers(response));
    } catch (error) {
        yield put(raiseError(error));
    }
}

export function* memberAcceptance() {
    while (true) {
        const action = yield take(MEMBER_ACCEPTANCE);
        const currentTeam = yield call(getCurrentTeam);
        const url = api.urls.teamMemberEntity(currentTeam.id, action.id);
        try {
            if (action.shouldAccept) {
                yield call(api.requests.patch, url, { is_accepted: true }, 'Cannot accept membership of this user.');
            } else {
                yield call(api.requests['delete'], url, { is_accepted: true }, 'Cannot reject membership of this user');
            }
            yield put(showInfo(`User membership ${action.shouldAccept ? 'confirmed' : 'rejected'} successfully.`))
        } catch (error) {
            yield put(raiseError(error));
        } finally {
            yield call(fetchPendingMembers);
        }
    }
}

export function* teams() {
    yield [
        teamCreationFlow(),
        handleSelectTeam(),
        handleJoinTeam(),
        memberAcceptance(),
        leaveTeam(),
    ];
}