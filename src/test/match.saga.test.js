import { call, put, take } from 'redux-saga/effects';
import * as API from '../api/connectors';
import * as MatchActions from '../matches/match.actions';
import * as MatchTypes from '../matches/match.types';
import * as InfoBarActions from '../shared/infobar.actions';
import { raiseError } from '../shared/error.actions';
import { publish, removeMatch } from '../matches/matches.sagas';
import { fetchUsers } from '../users/users.sagas';

describe('Publish a match - success scenario', () => {
    const iterator = publish();
    const matchData = {
        red_def: 'agappe1',
        red_att: 'barthy2',
        blue_def: 'celine3',
        blue_att: 'doughnut4',
        red_score: 3,
        blue_score: 10,
    };
    const response = {
        red_def: 'agappe1',
        red_att: 'barthy2',
        blue_def: 'celine3',
        blue_att: 'doughnut4',
        date: "2017-01-10T20:24:31.805366Z",
        red_score: 3,
        blue_score: 10,
        points: -22,
    };
    const callback = () => {};

    it('should wait for PUBLISH action to be dispatched', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(take(MatchTypes.PUBLISH));
    });

    it('should call api to publish match', () => {
        const iter = iterator.next(MatchActions.publish(matchData, callback)).value;
        expect(iter).toEqual(call(API.publishMatch, matchData));
    });

    it('should put an action with server response', () => {
        expect(iterator.next(response).value).toEqual(put(MatchActions.sent(response)));
    });

    it('should display success message', () => {
        const success_msg = points => `Match successfully saved. Red: ${points}, Blue: ${-points}`;
        expect(iterator.next(response).value).toEqual(put(InfoBarActions.displayInfo(success_msg(response.points))));
    });

    it('should call to refresh users', () => {
        expect(iterator.next().value).toEqual(call(fetchUsers));
    });

    it('should call the callback', () => {
        expect(iterator.next().value).toEqual(call(callback));
    });
});

describe('Publish a match - API failure scenario', () => {
    const iterator = publish();
    const matchData = {
        red_def: 'agappe1',
        red_att: 'barthy2',
        blue_def: 'celine3',
        blue_att: 'doughnut4',
        red_score: 3,
        blue_score: 10,
    };

    const callback = () => {};

    it('should wait for PUBLISH action to be dispatched', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(take(MatchTypes.PUBLISH));
    });

    it('should call api to publish match', () => {
        const iter = iterator.next(MatchActions.publish(matchData, callback)).value;
        expect(iter).toEqual(call(API.publishMatch, matchData));
    });

    it('should put ERROR when API fails', () => {
        expect(iterator.throw('Failed to publish match').value).toEqual(put(raiseError('Failed to publish match')));
    });
});

describe('Remove a match - success scenario', () => {
    const iterator = removeMatch();
    const matchID = 0;

    it('should wait for DELETE action to be dispatched', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(take(MatchTypes.DELETE));
    });

    it('should call API to remove match', () => {
        const iter = iterator.next(MatchActions.remove(matchID)).value;
        expect(iter).toEqual(call(API.removeMatch, matchID));
    });

    it('should put action match DELETED', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(put(MatchActions.removed(matchID)));
    });
});

describe('Remove a match - failure scenario', () => {
    const iterator = removeMatch();
    const matchID = 0;

    it('should wait for DELETE action to be dispatched', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(take(MatchTypes.DELETE));
    });

    it('should call API to remove match', () => {
        const iter = iterator.next(MatchActions.remove(matchID)).value;
        expect(iter).toEqual(call(API.removeMatch, matchID));
    });

    it('should handle API response error', () => {
        const iter = iterator.throw(`Failed to delete match of id#${matchID}`).value;
        expect(iter).toEqual(put(raiseError(`Failed to delete match of id#${matchID}`)));
    });
});
