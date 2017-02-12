import { call, take, put, select } from 'redux-saga/effects';
import api from '../api';
import { CHOOSE } from '../users/user.types';
import { raiseError } from '../shared/notifier.actions';
import { requestStatsDone } from './play.actions';

export function* playScore() {
    while (true) {
        yield take(CHOOSE);
        const players = yield select(
            ({users}) => users
                .filter(u => u.playing)
                .reduce(
                    (data, player) => Object.assign(data, {[`${player.team}_${player.position}`]: player.id}),
                    {}
                )
        );
        const url = api.urls.matchPoints();
        try {
            const response = yield call(api.requests.get, url, players, 'Unable to get match score statistics.');
            yield put(requestStatsDone(response));
        } catch (error) {
            yield put(raiseError(error));
        }
    }
}
