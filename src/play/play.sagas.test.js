import { call, put, takeLatest, select } from 'redux-saga/effects';
import api from '../api/index';
import { raiseError } from '../shared/notifier.actions';
import { fetchPlayScore, playScore } from './play.sagas';
import { CHOOSE, SWAP_SIDES, SWAP_POSITIONS, ASSIGN } from '../users/users.actions';
import { requestStatsDone } from './play.actions';
import { arePositionsSet, getUsersPlayingById } from "../users/users.reducer";
import { getSelectedTeam } from "../teams/teams.reducer";

describe('PlayScore saga', () => {
    const currentTeam = {
        id: 17,
    };
    const url = api.urls.teamMatchPoints(currentTeam.id);
    const errorMsg = 'Unable to get match score statistics.';
    const players = {
        red_att: {id: 1},
        red_def: {id: 2},
        blue_def: {id: 3},
        blue_att: {id: 4},
    };
    const response = {
        blue: 21,
        red: 21,
    };

    describe('Scenario 1: Successfully obtained play score', () => {
        const iterator = fetchPlayScore();

        it('should check if positions are set', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(arePositionsSet));
        });

        it('should get playing users', () => {
            const iter = iterator.next(true).value;
            expect(iter).toEqual(select(getUsersPlayingById))
        });

        it('should obtain current team', () => {
            const iter = iterator.next(players).value;
            expect(iter).toEqual(select(getSelectedTeam));
        });

        it('should make GET request to team match points', () => {
            const iter = iterator.next(currentTeam).value;
            expect(iter).toEqual(call(api.requests.get, url, players, errorMsg));
        });

        it('should put action with score', () => {
            const iter = iterator.next(response).value;
            expect(iter).toEqual(put(requestStatsDone(response)));
        });

        it('should return from saga', () => {
            expect(iterator.next().done).toBe(true);
        });
    });

    describe('Scenario 2: Failed to obtain play score from API', () => {
        const iterator = fetchPlayScore();

        it('should check if positions are set', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(arePositionsSet));
        });

        it('should get playing users', () => {
            const iter = iterator.next(true).value;
            expect(iter).toEqual(select(getUsersPlayingById))
        });

        it('should obtain current team', () => {
            const iter = iterator.next(players).value;
            expect(iter).toEqual(select(getSelectedTeam));
        });

        it('should make GET request to team match points', () => {
            const iter = iterator.next(currentTeam).value;
            expect(iter).toEqual(call(api.requests.get, url, players, errorMsg));
        });

        it('should put RAISE_ERROR with errorMsg', () => {
            const iter = iterator.throw(errorMsg).value;
            expect(iter).toEqual(put(raiseError(errorMsg)));
        });

        it('should return from saga', () => {
            expect(iterator.next().done).toBe(true);
        });
    });

    describe('React to all player changing actions', () => {
        const iterator = playScore();

        it('should take latest CHOOSE', () => {
            expect(iterator.next().value).toEqual(takeLatest(CHOOSE, fetchPlayScore));
        });

        it('should take latest SWAP_POSITIONS', () => {
            expect(iterator.next().value).toEqual(takeLatest(SWAP_POSITIONS, fetchPlayScore));
        });

        it('should take latest SWAP_SIDES', () => {
            expect(iterator.next().value).toEqual(takeLatest(SWAP_SIDES, fetchPlayScore));
        });

        it('should take latest ASSIGN', () => {
            expect(iterator.next().value).toEqual(takeLatest(ASSIGN, fetchPlayScore));
        });
    });
});
