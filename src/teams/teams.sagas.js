import { call, put, select, takeEvery, takeLatest, throttle, fork } from 'redux-saga/effects';
import * as teamActions from './teams.actions.js';
import * as fromUsers from '../users/users.actions';
import api from '../api';
import { showInfo, raiseError } from '../shared/notifier.actions';
import { authenticate, fetchProfile } from '../shared/auth/auth.sagas';
import { validateMember } from '../settings/settings.sagas';
import { browserHistory } from 'react-router';
import { getSelectedTeam, getMyRequestsPending, getJoinedTeams, getDefaultTeamId } from './teams.reducer';
import { showQuestionModal } from '../shared/modal.actions';
import { profileUpdate } from "../profile/profile.actions";
import { getAuthProfile, getToken } from "../shared/auth/auth.reducer";
import { fetchUsers } from "../users/users.sagas";
import { erroredEvents, fetchedEvents } from "./teams.actions";


export function* onTeamSelect({team}) {
    yield call(fetchProfile, team.id, team.member_id);
    yield call([browserHistory, browserHistory.push], `/clubs/joined`);
}

export function* createTeam(action) {
    const url = api.urls.teamList();
    const data = validateMember({
        name: action.name,
        username: action.username,
    });
    const response = yield call(api.requests.post, url, data, 'Club already exists');
    yield put(teamActions.teamCreated(response));
    yield put(showInfo(`Club ${action.name} successfully created.`));
    yield put(teamActions.selectTeam(response));
    return response;
}

export function* onTeamLeave({team}) {
    const url = api.urls.teamMemberEntity(team.id, team.member_id);
    try {
        yield call(api.requests['delete'], url, {}, `Failed to leave the club ${team.name}.`);
    } catch (error) {
        yield put(raiseError(error));
    }
    yield put(teamActions.teamLeft(team));
    yield put(showInfo(`Club ${team.name} was left.`));
}

export function* onTeamCreate(action) {
    try {
        yield call(authenticate);
    } catch (error) {
        yield put(raiseError(error));
    }
    try {
        const team = yield call(createTeam, action);
        yield call(fetchTeams);
        yield call(fetchProfile, team.id, team.member_id);
        yield call([browserHistory, browserHistory.push], '/match');
    } catch (error) {
        yield put(raiseError('Club with this name already exists or username is taken.'));
    }
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
    const {joinedTeams, defaultTeamId, selectedTeam} = yield select(state => ({
        joinedTeams: getJoinedTeams(state),
        defaultTeamId: getDefaultTeamId(state),
        selectedTeam: getSelectedTeam(state),
    }));
    let currentTeam = selectedTeam;
    if (joinedTeams.length === 0) {
        yield call([browserHistory, browserHistory.push], '/welcome');
        return;
    }
    if (!currentTeam || !currentTeam.id) {
        currentTeam = joinedTeams.find(team => team.id === defaultTeamId) || joinedTeams[0];
    }
    yield put(teamActions.selectTeam(currentTeam));
    return currentTeam;
}

export function* onTeamJoin(action) {
    const url = api.urls.teamJoin();
    const errorMsg = 'Club doesn\'t exist or username already taken';

    try {
        const response = yield call(api.requests.post, url, action.data, errorMsg);
        yield put(showQuestionModal({
            title: 'One second, please...',
            text: response,
            onAccept: () => {
            },
        }));
        const myPending = yield select(getMyRequestsPending);
        yield put(teamActions.updateMyPending(myPending + 1));
    } catch (error) {
        yield put(raiseError(error));
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
    const response = yield call(api.requests.get, url, {name_prefix: input}, 'Cannot get clubs autocompletion');
    const cbData = response.map(team => ({
        value: team.name,
        label: team.name,
    }));
    yield put(teamActions.receivedAutocompletion(cbData))
}


export function* emailAutocompletion({input}) {
    if (input.length < 3) {
        yield put(fromUsers.receivedEmailAutocompletion([]));
        return;
    }
    const url = api.urls.playerList();
    const response = yield call(api.requests.get, url, {email_prefix: input}, 'Cannot get email autocompletion');
    const cbData = response.map(player => ({
        value: player.email,
        label: player.first_name && player.last_name ?
            `${player.email} [${player.first_name} ${player.last_name}]` :
            player.email,
    }));
    yield put(fromUsers.receivedEmailAutocompletion(cbData))
}

export function* onTeamInvite({email}) {
    const currentTeam = yield select(getSelectedTeam);
    const url = api.urls.teamInvite(currentTeam.id);
    try {
        const {message} = yield call(api.requests.post, url, {email}, `Failed to send invitation to ${email}`);
        yield put(showInfo(message));
    } catch (error) {
        yield put(raiseError(error));
    }
}


export function* fetchEvents() {
    const selectedTeam = yield select(getSelectedTeam);
    const url = api.urls.teamEvents(selectedTeam.id);
    try {
        const response = yield call(api.requests.get, url);
        yield put(fetchedEvents(response));
    }
    catch (error) {
        yield put(erroredEvents(error));
    }
}

export function* teamList() {
    yield fork(fetchTeams);
    yield fork(fetchEvents);
    yield takeLatest(teamActions.CHANGE_DEFAULT, onChangeDefault);
    yield takeLatest(teamActions.REQUEST_CREATE_TEAM, onTeamCreate);
    yield takeLatest(teamActions.REQUEST_JOIN_TEAM, onTeamJoin);
    yield takeLatest(teamActions.SELECT_TEAM, onTeamSelect);
    yield throttle(500, teamActions.FETCH_AUTOCOMPLETION, nameAutocompletion);
    yield takeEvery(teamActions.LEAVE_TEAM, onTeamLeave);
}

export function* teamPending() {
    yield fork(fetchPendingMembers);
    yield takeLatest(teamActions.MEMBER_ACCEPTANCE, onMemberAccept);
}

export function* teamInvite() {
    yield throttle(500, fromUsers.FETCH_AUTOCOMPLETION, emailAutocompletion);
    yield takeLatest(fromUsers.INVITE, onTeamInvite);
}

export function* teamAdmin() {
    yield fork(fetchUsers);
    yield takeLatest(teamActions.MANAGE_USER, onManageUser);
}
