import { call, take, put } from 'redux-saga/effects';
import { CREATE_TEAM } from './teams.actions.js';
import api from '../api';
import { showInfo, raiseError } from '../shared/notifier.actions';
import { authenticate, fetchProfile } from './auth.sagas';
import { validateMember } from '../settings/settings.sagas';
import { browserHistory } from 'react-router';

const getDomain = (name) => {
    return name; // TODO lowercase, replace whitechars, escape HTML, validate by regex
};

function* createTeam(action) {
    const url = api.urls.teams();
    try {
        const data = validateMember({
            name: action.name,
            username: action.username,
            domain: getDomain(action.name),
        });
        yield call(api.requests.post, url, data, 'Unable to create team');
        yield put(showInfo(`Team ${action.name} created.`));
    } catch (error) {
        yield put(raiseError(error));
    }
}

export function* teamCreationFlow() {
    const action = yield take(CREATE_TEAM);
    // TODO First validate form data
    yield authenticate(); // TODO check if not authenticated within this generator itself
    yield fetchProfile(); // TODO Should not get there if failed during any previous steps
    // TODO fetch teams list
    yield createTeam(action);
    // TODO set domain
    browserHistory.push('/match')
}
