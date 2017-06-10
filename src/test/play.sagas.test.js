import { call, put, takeLatest, select } from 'redux-saga/effects';
import api from '../api';
import { raiseError, showInfo } from '../shared/notifier.actions';
import { stateUsersPlayingSelector, fetchPlayScore, playScore } from '../play/play.sagas';
import { CHOOSE, SWAP_SIDES, SWAP_POSITIONS, ASSIGN } from '../users/user.types';
import { getCurrentTeam } from '../teams/teams.sagas';
import { requestStatsDone } from '../play/play.actions';

describe('PlayScore saga', () => {
    const currentTeam = {
        id: 17,
    };
    const url = api.urls.teamMatchPoints(currentTeam.id);
    const errorMsg =  'Unable to get match score statistics.';
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

        it('should select playing users', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(stateUsersPlayingSelector));
        });

        it('should obtain current team', () => {
            const iter = iterator.next(players).value;
            expect(iter).toEqual(call(getCurrentTeam));
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

        it('should select playing users', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(stateUsersPlayingSelector));
        });

        it('should obtain current team', () => {
            const iter = iterator.next(players).value;
            expect(iter).toEqual(call(getCurrentTeam));
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

describe('Playing users selector', () => {
    const state = {
        users: [
            { id: 1, team: 'red', position: 'att', playing: true, },
            { id: 2, },
            { id: 3, team: 'red', position: 'def', playing: true, },
            { id: 4, team: 'blue', position: 'att', playing: true, },
            { id: 5, team: 'blue', position: 'def', playing: true, },
        ]
    };
    const expectedData = {
        red_att: 1,
        red_def: 3,
        blue_att: 4,
        blue_def: 5,
    };
    expect(stateUsersPlayingSelector(state)).toEqual(expectedData);
});
