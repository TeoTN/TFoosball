import { call, take, put, select, takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import * as teamActions from './teams.actions.js';
import api from '../api';
import { showInfo, raiseError } from '../shared/notifier.actions';
import { authenticate, fetchProfile } from '../shared/auth/auth.sagas';
import { validateMember } from '../settings/settings.sagas';
import { browserHistory } from 'react-router';
import { getSelectedTeam, getTeamsState } from './teams.reducer';
import { showQuestionModal } from '../shared/modal.actions';
import { profileUpdate } from "../profile/profile.actions";
import { getAuthProfile, getToken } from "../shared/auth/auth.reducer";


export function* onTeamSelect({team}) {
    yield call(fetchProfile, team.id, team.member_id);
    yield call([browserHistory, browserHistory.push], `/clubs/joined`);
}

export function* handleSelectTeam() {
    yield takeLatest(teamActions.SELECT_TEAM, onTeamSelect);
}

export function* createTeam(action) {
    const url = api.urls.teamList();
    const data = validateMember({
        name: action.name,
        username: action.username,
    });
    let response = {};
    try {
        response = yield call(api.requests.post, url, data, 'Club already exists');
    } catch (error) {
        yield put(raiseError(error));
        return response;
    }
    yield put(teamActions.teamCreated(response));
    yield put(showInfo(`Club ${action.name} successfully created.`));
    yield put(teamActions.selectTeam(response));
    return response;
}

export function* leaveTeam() {
    const leave = function* ({team}) {
        const url = api.urls.teamMemberEntity(team.id, team.member_id);
        try {
            yield call(api.requests['delete'], url, {}, `Failed to leave the club ${team.name}.`);
        } catch (error) {
            yield put(raiseError(error));
        }
        yield put(teamActions.teamLeft(team));
        yield put(showInfo(`Club ${team.name} was left.`));
    };
    yield takeEvery(teamActions.LEAVE_TEAM, leave);
}

export function* onTeamCreate(action) {
    // TODO First validate form data
    yield call(authenticate);
    const team = yield call(createTeam, action);
    yield call(fetchTeams);
    yield call(fetchProfile, team.id, team.member_id); // TODO Should not get there if failed during any previous steps
    yield call([browserHistory, browserHistory.push], '/match');
}

export function* fetchTeams() {
    const token = yield select(getToken);
    if (token === undefined) return;
    const url = api.urls.teamListJoined();
    try {
        const response = yield call(api.requests.get, url, {}, 'Failed to fetch user clubs');
        yield put(teamActions.setTeams(response));
    } catch (error) {
        yield put(raiseError(error))
    }
}

export function* initTeam() {
    const teamsState = yield select(getTeamsState);
    let currentTeam = yield select(getSelectedTeam);
    if (teamsState.joined.length === 0) {
        yield call([browserHistory, browserHistory.push], '/welcome');
        return;
    }
    if (currentTeam === undefined) {
        const defaultTeam = yield select(getAuthProfile).default_team;
        currentTeam = teamsState.joined.find(team => team.id === defaultTeam) || teamsState.joined[0];
    }
    yield put(teamActions.selectTeam(currentTeam));
    return currentTeam;
}

export function* handleJoinTeam() {
    while (true) {
        const action = yield take(teamActions.REQUEST_JOIN_TEAM);
        const url = api.urls.teamJoin();
        try {
            const errorMsg = 'Club doesn\'t exist or username already taken';
            const response = yield call(api.requests.post, url, action.data, errorMsg);
            yield put(showQuestionModal({
                title: 'One second, please...',
                text: response,
                onAccept: () => {},
            }));
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}

export function* fetchPendingMembers() {
    const errorMsg = 'Failed to fetch pending members';
    const currentTeam = yield select(getSelectedTeam);
    const url = api.urls.teamMemberList(currentTeam.id);
    try {
        const response = yield call(api.requests.get, url, {is_accepted: 'False'}, errorMsg);
        yield put(teamActions.setPendingMembers(response));
    } catch (error) {
        yield put(raiseError(error));
    }
}

export function* onMemberAccept(action) {
    const currentTeam = yield select(getSelectedTeam);
    const url = api.urls.teamMemberEntity(currentTeam.id, action.id);
    try {
        if (action.shouldAccept) {
            yield call(api.requests.patch, url, {is_accepted: true}, 'Cannot accept membership of this user.');
        } else {
            yield call(api.requests['delete'], url, {is_accepted: true}, 'Cannot reject membership of this user');
        }
        yield put(showInfo(`User membership ${action.shouldAccept ? 'confirmed' : 'rejected'} successfully.`))
    } catch (error) {
        yield put(raiseError(error));
    } finally {
        yield call(fetchPendingMembers);
    }
}

export function* onManageUser({updatedProfile: {id, username, is_team_admin, hidden}}) {
    const error_msg = `Failed to manage ${username} settings.`;
    const currentTeam = yield select(getSelectedTeam);
    const url = api.urls.teamMemberEntity(currentTeam.id, id);
    try {
        const response = yield call(api.requests.patch, url, {is_team_admin, hidden}, error_msg);
        yield put(showInfo(`Updated ${username} settings.`));
        yield put(profileUpdate(response));
    }
    catch (error) {
        yield put(raiseError(error));
    }
}

export function* onChangeDefault({id}) {
    const player = yield select(getAuthProfile);
    const url = api.urls.playerEntity(player.user_id);
    try {
        yield call(api.requests.patch, url, {default_team: id}, 'Failed to set default club.');
        yield put(showInfo(`Updated default club.`));
    } catch (error) {
        yield put(raiseError(error));
    }
}

export function* nameAutocompletion({input}) {
    if (input.length < 3) {
        yield put(teamActions.receivedAutocompletion([]));
        return;
    }
    const url = api.urls.teamList();
    const response = yield call(api.requests.get, url, { name_prefix: input }, 'Cannot get clubs autocompletion');
    const cbData = response.map(team => ({
        value: team.name,
        label: team.name,
    }));
    yield put(teamActions.receivedAutocompletion(cbData))
}


export function* teams() {
    yield takeLatest(teamActions.CHANGE_DEFAULT, onChangeDefault);
    yield takeLatest(teamActions.MANAGE_USER, onManageUser);
    yield takeLatest(teamActions.MEMBER_ACCEPTANCE, onMemberAccept);
    yield takeLatest(teamActions.REQUEST_CREATE_TEAM, onTeamCreate);
    yield throttle(500, teamActions.FETCH_AUTOCOMPLETION, nameAutocompletion);

    yield [
        fetchTeams(),
        handleSelectTeam(),
        handleJoinTeam(),
        leaveTeam(),
    ];
}
