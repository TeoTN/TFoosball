import { call, take, put, select } from 'redux-saga/effects';
import { REQUEST_CREATE_TEAM, SELECT_TEAM, teamCreated, setTeams } from './teams.actions.js';
import api from '../../api';
import { showInfo, raiseError } from '../notifier.actions';
import { authenticate, fetchProfile } from '../auth.sagas';
import { validateMember } from '../../settings/settings.sagas';
import { browserHistory } from 'react-router';
import { saveTeamState } from '../../persistence';


const getDomain = (name) => {
    return name; // TODO lowercase, replace whitechars, escape HTML, validate by regex
};

export function* selectTeam() {
    while (true) {
        const action = yield take(SELECT_TEAM);
        try {
            yield call(saveTeamState, action.team);
            yield fetchProfile();
            window.location = '/match'; // TODO do something with this reload
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}

function* createTeam(action) {
    const url = api.urls.teams();
    const data = validateMember({
        name: action.name,
        username: action.username,
        domain: getDomain(action.name),
    });
    yield call(api.requests.post, url, data, 'Team already exists');
    yield put(teamCreated(data));
    yield put(showInfo(`Team ${action.name} created.`));
    yield call(saveTeamState, data);

}

export function* teamCreationFlow() {
    while (true) {
        const action = yield take(REQUEST_CREATE_TEAM);
        // TODO First validate form data
        try {
            yield authenticate(); // TODO check if not authenticated within this generator itself
            yield createTeam(action);
            yield fetchProfile(); // TODO Should not get there if failed during any previous steps
            browserHistory.push('/match');
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}

function* fetchTeams() {
    const alreadyAuthenticated = yield select(state => !!state.auth.token);
    if (!alreadyAuthenticated) return;
    const url = api.urls.teams();
    try {
        const response = yield call(api.requests.get, url, {}, 'Failed to get user teams');
        yield put(setTeams(response));
    } catch (error) {
        yield put(raiseError(error))
    }
}

export function* teams() {
    yield [
        fetchTeams(),
        teamCreationFlow(),
        selectTeam(),
    ];
}