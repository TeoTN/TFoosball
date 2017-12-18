import { call, put, select, takeLatest } from 'redux-saga/effects';
import api from '../api';
import { getCurrentTeam } from '../teams/teams.sagas';
import { CHOOSE, SWAP_SIDES, SWAP_POSITIONS, ASSIGN } from '../users/users.actions';
import { raiseError } from '../shared/notifier.actions';
import { requestStatsDone } from './play.actions';
import { getUsersPlaying } from "../users/users.reducer";
import * as fromMatch from "../matches/match.types";


export function* fetchPlayScore() {
    const players = yield select(getUsersPlaying);
    if (Object.keys(players).length !== 4) return;
    const currentTeam = yield call(getCurrentTeam);
    const url = api.urls.teamMatchPoints(currentTeam.id);
    try {
        const response = yield call(api.requests.get, url, players, 'Unable to get match score statistics.');
        yield put(requestStatsDone(response));
    } catch (error) {
        yield put(raiseError(error));
    }
}

export function* playScore() {
    yield takeLatest(CHOOSE, fetchPlayScore);
    yield takeLatest(SWAP_POSITIONS, fetchPlayScore);
    yield takeLatest(SWAP_SIDES, fetchPlayScore);
    yield takeLatest(ASSIGN, fetchPlayScore);
    yield takeLatest(fromMatch.SENT, fetchPlayScore);
}
