import { expect } from 'chai';
import * as actions from '../users/user.actions';
import deepFreeze from 'deep-freeze';
import users from '../users/users.reducer';
import usersMock from '../assets/mocks/users.json';

describe('Users reducer', function() {
    const username = 'Shannon';
    it('should add user', function() {
        const stateBefore = [];
        const action = actions.userNew(username);
        const stateAfter = [{
            id: 0,
            username,
            exp: 1000,
        }];

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(users(stateBefore, action)).to.deep.equal(stateAfter);
    });

    it('should delete user', function() {
        const stateBefore = [{
            id: 0,
            username,
            exp: 1000,
        }];
        const action = actions.userDelete(0);
        const stateAfter = [];

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(users(stateBefore, action)).to.deep.equal(stateAfter);
    });

    it('should select user', function() {
        const stateBefore = [{
            id: 0,
            username,
            exp: 1000,
        }];
        const action = actions.userToggle(stateBefore[0]);
        const stateAfter = [{
            id: 0,
            username,
            exp: 1000,
            selected: true,
        }];

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(users(stateBefore, action)).to.deep.equal(stateAfter);
    });

    it('should choose four users with teams and positions', function() {
        const stateBefore = usersMock;
        const action = actions.choosePlayersForMatch();
        deepFreeze(stateBefore);
        deepFreeze(action);
        const stateAfter = users(stateBefore, action).filter(u => u.playing);
        expect(stateAfter).to.have.lengthOf(4);
        for (let user of stateAfter) {
            expect(user).to.contain.all.keys(['team', 'position']);
        }
    });

    it('should not mutate state while sorting', function() {
        const stateBefore = usersMock;
        const actionExp = actions.sortByExp();
        const actionName = actions.sortByName();
        deepFreeze(stateBefore);
        deepFreeze(actionExp);
        deepFreeze(actionName);
        expect(users.bind(null, stateBefore, actionExp)).to.not.throw(Error);
        expect(users.bind(null, stateBefore, actionName)).to.not.throw(Error);
    });
});