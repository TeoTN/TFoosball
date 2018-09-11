import { call, put, select, take } from "redux-saga/effects";
import { INVITATION_AUTHORIZED, INVITATION_FINALIZE } from "./auth.types";
import { fetchTeams, initTeam } from "../teams/teams.sagas";
import { fetchProfile, onGoogleAuthenticated } from "./auth.sagas";
import { selectActivationCode, selectToken } from "./auth.selectors";
import api from "../api";
import { invitationCode, invitationSucceeded } from "./auth.actions";
import { redir } from "../utils/redir.effect";

export function* acceptInvitation({ activationCode }) {
    yield put(invitationCode(activationCode));
    const token = yield select(selectToken);
    if (token) {
        yield redir('/invitation/crunching/');
    }
    const action = yield take(INVITATION_AUTHORIZED);
    yield call(onGoogleAuthenticated, action);
    yield redir('/invitation/crunching/');
}

export function* crunchInvitation() {
    const token = yield select(selectToken);
    const activationCode = yield select(selectActivationCode);
    if (!activationCode) {
        yield redir('/invitation/failure');
    }
    if (!token && activationCode) {
        yield redir(`/invitation/accept/${activationCode}`);
    }
    const url = api.urls.teamAccept();
    try {
        const body = { activation_code: activationCode };
        const response = yield call(api.requests.post, url, body, 'Failed to activate with given code.');
        yield put(invitationSucceeded(response));
    } catch (error) {
        yield redir('/invitation/failure');
        return;
    }
    yield redir('/invitation/success');
}

export function* invitationSuccess() {
    yield take(INVITATION_FINALIZE);
    yield call(fetchTeams);
    const currentTeam = yield call(initTeam);
    yield call(fetchProfile, currentTeam.id, currentTeam.member_id);
    yield redir('/');
}
