import { call, take, put } from 'redux-saga/effects';
import { CREATE_TEAM } from './teams.actions.js';
import api from '../api';
import { displayInfo } from './infobar.actions';
import { raiseError } from './error.actions';
import { authenticate, fetchProfile } from './auth.sagas';

const getDomain = (name) => {
    return name;
};

function* createTeam(action) {
    const url = api.urls.teams();
    const data = {
        name: action.name,
        domain: getDomain(action.name),
    };
    try {
        yield call(api.requests.post, url, data, 'Unable to create team');
        yield put(displayInfo(`Team ${action.name} created.`));
    } catch (error) {
        yield put(raiseError(error));
    }
}

export function* teamCreationFlow() {
    const action = yield take(CREATE_TEAM);
    yield authenticate(); // TODO check if not authenticated within this generator itself
    yield fetchProfile();
    yield createTeam(action);
    // TODO redir
}
