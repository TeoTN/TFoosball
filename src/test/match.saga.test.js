import { call, put, take, select } from 'redux-saga/effects';
import api from '../api';
import * as MatchActions from '../matches/match.actions';
import * as MatchTypes from '../matches/match.types';
import { raiseError, showInfo } from '../shared/notifier.actions';
import { publish, removeMatch } from '../matches/matches.sagas';
import { fetchUpdateUsers } from '../users/users.sagas';

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

    it('should select team id', () => {
        expect(JSON.stringify(iterator.next(MatchActions.publish(matchData, callback)).value)).toEqual(JSON.stringify(select(() => 1)));
    });

    it('should call api to publish match', () => {
        const url = api.urls.teamMatchList(1);
        const expected = call(api.requests.post, url, matchData, 'Failed to send match to server');
        const iter = iterator.next(1).value;
        expect(iter).toEqual(expected);
    });

    it('should put an action with server response', () => {
        expect(iterator.next(response).value).toEqual(put(MatchActions.sent(response)));
    });

    it('should display success message', () => {
        const success_msg = points => `Match successfully saved. Red: ${points}, Blue: ${-points}`;
        expect(iterator.next(response).value).toEqual(put(showInfo(success_msg(response.points))));
    });

    it('should call to refresh users', () => {
        expect(iterator.next().value).toEqual(call(fetchUpdateUsers));
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
    const currentTeamId = 1;
    const callback = () => {};

    it('should wait for PUBLISH action to be dispatched', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(take(MatchTypes.PUBLISH));
    });

    it('should select team id', () => {
        const iter = JSON.stringify(iterator.next(MatchActions.publish(matchData, callback)).value);
        expect(iter).toEqual(JSON.stringify(select(() => currentTeamId)));
    });

    it('should call api to publish match', () => {
        const url = api.urls.teamMatchList(currentTeamId);
        const expected = call(api.requests.post, url, matchData, 'Failed to send match to server');
        const iter = iterator.next(currentTeamId).value;
        expect(iter).toEqual(expected);
    });

    it('should put ERROR when API fails', () => {
        const error_msg = 'Failed to send match to server';
        expect(iterator.throw(error_msg).value).toEqual(put(raiseError(error_msg)));
    });
});

describe('Remove a match - success scenario', () => {
    const iterator = removeMatch();
    const matchID = 0;

    it('should wait for DELETE action to be dispatched', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(take(MatchTypes.DELETE));
    });

    it('should select team id', () => {
        const iter = JSON.stringify(iterator.next(MatchActions.remove(matchID)).value);
        expect(iter).toEqual(JSON.stringify(select(() => 1)));
    });

    it('should call API to remove match', () => {
        const iter = iterator.next(1).value;
        const url = api.urls.teamMatchEntity(1, matchID);
        expect(iter).toEqual(call(api.requests['delete'], url));
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

    it('should select team id', () => {
        const iter = JSON.stringify(iterator.next(MatchActions.remove(matchID)).value);
        expect(iter).toEqual(JSON.stringify(select(() => 1)));
    });

    it('should call API to remove match', () => {
        const iter = iterator.next(1).value;
        const url = api.urls.teamMatchEntity(1, matchID);
        expect(iter).toEqual(call(api.requests['delete'], url));
    });

    it('should handle API response error', () => {
        const iter = iterator.throw(`Failed to delete match of id#${matchID}`).value;
        expect(iter).toEqual(put(raiseError(`Failed to delete match of id#${matchID}`)));
    });
});
