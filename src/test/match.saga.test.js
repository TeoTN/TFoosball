import { call, put, take } from 'redux-saga/effects';
import { publishMatch as api_publishMatch} from '../api/connectors';
import * as MatchActions from '../actions/match.actions';
import * as MatchTypes from '../actions/match.types';
import * as InfoBarActions from '../actions/infobar.actions';
import { raiseError } from '../actions/error.actions';
import { publish } from '../sagas/match';

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
        expect(iter).toEqual(call(api_publishMatch, matchData));
    });

    it('should put an action with server response', () => {
        expect(iterator.next(response).value).toEqual(put(MatchActions.sent(response)));
    });

    it('should display success message', () => {
        const success_msg = points => `Match successfully saved. Red: ${points}, Blue: ${-points}`;
        expect(iterator.next(response).value).toEqual(put(InfoBarActions.displayInfo(success_msg(response.points))));
    });

    it('should call the callback', () => {
        expect(iterator.next().value).toEqual(call(callback));
    });
});