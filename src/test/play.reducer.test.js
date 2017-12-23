import deepFreeze from 'deep-freeze';
import reducer from '../play/play.reducer';
import * as playActions from '../play/play.actions';

describe('Play reducer', function() {
    it('should handle game stats fetched', () => {
        const stateBefore = {
            stats: {red: 0, blue: 0}
        };
        const action = playActions.requestStatsDone({red: 17, blue: 15});
        const stateAfter = {
            stats: {red: 17, blue: 15},
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });

    it('should NOT change state on default', () => {
        const stateBefore = {
            stats: {red: 0, blue: 0}
        };
        const action = {
            type: 'UNKNOWN'
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(reducer(stateBefore, action)).toEqual(stateBefore);
    });
});
