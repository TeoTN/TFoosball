import { call, take, put, select } from 'redux-saga/effects';
import { REQUEST_CREATE_TEAM, SELECT_TEAM, teamCreated, setTeams, selectTeam } from './teams.actions.js';
import api from '../../api';
import { showInfo, raiseError } from '../notifier.actions';
import { authenticate, fetchProfile } from '../auth.sagas';
import { validateMember } from '../../settings/settings.sagas';
import { browserHistory } from 'react-router';
import { getSelectedTeam } from './teams.reducer';


export function* handleSelectTeam() {
    while (true) {
        const { team } = yield take(SELECT_TEAM);
        try {
            yield call(fetchProfile, team.id, team.member_id);
            yield call([browserHistory, browserHistory.push], '/match');
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}

function* createTeam(action) {
    const url = api.urls.teamList();
    const data = validateMember({
        name: action.name,
        username: action.username,
    });
    const response = yield call(api.requests.post, url, data, 'Team already exists');
    yield put(teamCreated(response));
    yield put(showInfo(`Team ${action.name} created.`));
    yield put(selectTeam(response));
    return response;
}

export function* teamCreationFlow() {
    while (true) {
        const action = yield take(REQUEST_CREATE_TEAM);
        // TODO First validate form data
        try {
            yield call(authenticate); // TODO check if not authenticated within this generator itself
            const team = yield call(createTeam, action);
            yield call(fetchTeams);
            yield call(fetchProfile, team.id, team.member_id); // TODO Should not get there if failed during any previous steps
            yield call([browserHistory, browserHistory.push], '/match');
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}

export function* fetchTeams() {
    const alreadyAuthenticated = yield select(state => !!state.auth.token);
    if (!alreadyAuthenticated) return;
    const url = api.urls.teamListJoined();
    try {
        const teams = yield call(api.requests.get, url, {}, 'Failed to fetch user teams');
        yield put(setTeams(teams));
    } catch (error) {
        yield put(raiseError(error))
    }
}

export function* initTeam() {
    const teamsState = yield select(state => state.teams);
    let currentTeam = getSelectedTeam(teamsState);
    if (teamsState.joined.length === 0) {
        browserHistory.push('/welcome');
        return;
    }
    if (!currentTeam) {
        currentTeam = teamsState.joined[0];
    }
    yield put(selectTeam(currentTeam));
    console.log('initTeam returns', currentTeam);
    return currentTeam;
}

export function* teams() {
    yield [
        fetchTeams(),
        teamCreationFlow(),
        handleSelectTeam(),
    ];
}