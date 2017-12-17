import * as actions from '../users/user.actions';
import deepFreeze from 'deep-freeze';
import { user, users, getSortedUsers, clean, reducer } from '../users/users.reducer';
import * as fromUsers from '../users/users.actions';
import usersMock from '../assets/mocks/users.json';


describe('Clean reducer', () => {
    it('should clean playing, team, position', () => {
        const stateBefore = [
            {id: 1, playing: true, team: 'red', position: 'att', exp: 1000, },
            {id: 2, playing: true, team: 'red', position: 'def', exp: 1000, },
            {id: 3, playing: true, team: 'blue', position: 'att', exp: 1000, },
            {id: 4, playing: true, team: 'blue', position: 'def', exp: 1000, },
            {id: 5, exp: 1000, },
        ];
        const action = actions.choosePlayersForMatch();
        const stateAfter = [
            {id: 1, playing: false, team: undefined, position: undefined, exp: 1000, },
            {id: 2, playing: false, team: undefined, position: undefined, exp: 1000, },
            {id: 3, playing: false, team: undefined, position: undefined, exp: 1000, },
            {id: 4, playing: false, team: undefined, position: undefined, exp: 1000, },
            {id: 5, playing: false, team: undefined, position: undefined, exp: 1000, },
        ];

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(clean(stateBefore, action)).toEqual(stateAfter);
    });

    it('should not change state on default action', () => {
        const state = [{ id: 0, username: 'U0', team: 'red', position: 'att', }];
        const action = { type: 'NULL::DEFAULT', };
        deepFreeze(state);
        deepFreeze(action);
        expect(users(state, action)).toEqual(state);
    });
});


describe('User reducer', () => {
    // it('should create new user object', () => {
    //     const stateBefore = {};
    //     const action = actions.userNew('Corn');
    //     const stateAfter = {
    //         id: 0,
    //         username: 'Corn',
    //         exp: 1000,
    //     };
    //
    //     deepFreeze(stateBefore);
    //     deepFreeze(action);
    //     expect(user(stateBefore, action)).toEqual(stateAfter);
    // });

    it('should swap position', () => {
        const stateBefore = { id: 0, username: 'U0', playing: true, team: 'red', position: 'att', };
        const stateAfter = { id: 0, username: 'U0', playing: true, team: 'red', position: 'def', };
        const action = actions.swapPositions();

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(user(stateBefore, action)).toEqual(stateAfter);
    });

    it('should not swap position of non-player', () => {
        const stateBefore = { id: 0, username: 'U0', team: 'red', position: 'att', };
        const stateAfter = { id: 0, username: 'U0', team: 'red', position: 'att', };
        const action = actions.swapPositions();

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(user(stateBefore, action)).toEqual(stateAfter);
    });

    it('should swap side', () => {
        const stateBefore = { id: 0, username: 'U0', playing: true, team: 'red', position: 'att', };
        const stateAfter = { id: 0, username: 'U0', playing: true, team: 'blue', position: 'att', };
        const action = actions.swapSides();

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(user(stateBefore, action)).toEqual(stateAfter);
    });

    it('should not swap side of non-player', () => {
        const stateBefore = { id: 0, username: 'U0', team: 'red', position: 'att', };
        const stateAfter = { id: 0, username: 'U0', team: 'red', position: 'att', };
        const action = actions.swapSides();

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(user(stateBefore, action)).toEqual(stateAfter);
    });

    it('should not change state on default action', () => {
        const state = { id: 0, username: 'U0', team: 'red', position: 'att', };
        const action = { type: 'NULL::DEFAULT', };
        deepFreeze(state);
        deepFreeze(action);
        expect(users(state, action)).toEqual(state);
    });
});


describe('User list reducer', function() {
    // const username = 'Shannon';
    // it('should add user', function() {
    //     const stateBefore = [];
    //     const action = actions.userNew(username);
    //     const stateAfter = [{
    //         id: 1,
    //         username,
    //         exp: 1000,
    //     }];
    //
    //     deepFreeze(stateBefore);
    //     deepFreeze(action);
    //
    //     expect(users(stateBefore, action)).toEqual(stateAfter);
    // });
    //
    // it('should update user', () => {
    //     const stateBefore = [
    //         {id: 1, playing: true, team: 'red', position: 'att', exp: 1000, },
    //         {id: 2, playing: true, team: 'red', position: 'def', exp: 1000, },
    //         {id: 3, playing: true, team: 'blue', position: 'att', exp: 1000, },
    //         {id: 4, playing: true, team: 'blue', position: 'def', exp: 1000, },
    //         {id: 5, exp: 1000, },
    //     ];
    //     const stateAfter = [
    //         {id: 1, playing: true, team: 'red', position: 'att', exp: 1000, },
    //         {id: 2, playing: true, team: 'red', position: 'def', exp: 1000, },
    //         {id: 3, playing: true, team: 'blue', position: 'att', exp: 1521, },
    //         {id: 4, playing: true, team: 'blue', position: 'def', exp: 1000, },
    //         {id: 5, exp: 1000, },
    //     ];
    //     const action = actions.userUpdate(3, { exp: 1521, });
    //
    //     deepFreeze(stateBefore);
    //     deepFreeze(action);
    //
    //     expect(users(stateBefore, action)).toEqual(stateAfter);
    // });
    //
    // it('should delete user', function() {
    //     const stateBefore = [
    //         {id: 1, playing: true, team: 'red', position: 'att', exp: 1000, },
    //         {id: 2, playing: true, team: 'red', position: 'def', exp: 1000, },
    //         {id: 3, playing: true, team: 'blue', position: 'att', exp: 1000, },
    //         {id: 4, playing: true, team: 'blue', position: 'def', exp: 1000, },
    //         {id: 5, exp: 1000, },
    //     ];
    //     const stateAfter = [
    //         {id: 1, playing: true, team: 'red', position: 'att', exp: 1000, },
    //         {id: 2, playing: true, team: 'red', position: 'def', exp: 1000, },
    //         {id: 4, playing: true, team: 'blue', position: 'def', exp: 1000, },
    //         {id: 5, exp: 1000, },
    //     ];
    //     const action = actions.userDelete(3);
    //
    //     deepFreeze(stateBefore);
    //     deepFreeze(action);
    //
    //     expect(users(stateBefore, action)).toEqual(stateAfter);
    // });
    //
    // it('should select user', function() {
    //     const stateBefore = [
    //         { id: 0, username: 'User0', exp: 1000, },
    //         { id: 1, username: 'User1', exp: 1000, },
    //         { id: 2, username: 'User2', exp: 1000, },
    //     ];
    //     const user = stateBefore[1];
    //     const action = actions.userToggle(user);
    //     const stateAfter = [
    //         { id: 0, username: 'User0', exp: 1000, },
    //         { id: 1, username: 'User1', exp: 1000, selected: true, },
    //         { id: 2, username: 'User2', exp: 1000, },
    //     ];
    //
    //     deepFreeze(stateBefore);
    //     deepFreeze(user);
    //     deepFreeze(action);
    //
    //     expect(users(stateBefore, action)).toEqual(stateAfter);
    // });

    it('should choose four users with teams and positions', function() {
        const stateBefore = usersMock;
        const action = actions.choosePlayersForMatch();
        deepFreeze(stateBefore);
        deepFreeze(action);
        const stateAfter = users(stateBefore, action).filter(u => u.playing);
        expect(stateAfter).toHaveLength(4);
        for (const user of stateAfter) {
            const keys = Object.keys(user);
            expect(keys).toContain('team');
            expect(keys).toContain('position');
        }
    });

    it('should throw error when insufficient no of players selected', () => {
        const errorMsg = 'Insufficient number of players selected.';
        const stateBefore = [
            { id: 0, username: 'User0', exp: 1000, selected: true, },
            { id: 1, username: 'User1', exp: 1000, selected: true, },
            { id: 2, username: 'User2', exp: 1000, selected: true, },
            { id: 3, username: 'User3', exp: 1000, },
        ];
        const action = actions.choosePlayersForMatch();
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(() => users(stateBefore, action)).toThrowError(errorMsg);
    });

    it('should sort by exp ascending', () => {
        const stateBefore = [
            {id: 1, playing: true, team: 'red', position: 'att', exp: 978, },
            {id: 2, playing: true, team: 'red', position: 'def', exp: 1015, },
            {id: 3, playing: true, team: 'blue', position: 'att', exp: 866, },
            {id: 4, playing: true, team: 'blue', position: 'def', exp: 1121, },
            {id: 5, exp: 1004, },
        ];
        const action = actions.sortBy('exp', true);
        const stateAfter = [
            {id: 3, playing: true, team: 'blue', position: 'att', exp: 866, },
            {id: 1, playing: true, team: 'red', position: 'att', exp: 978, },
            {id: 5, exp: 1004, },
            {id: 2, playing: true, team: 'red', position: 'def', exp: 1015, },
            {id: 4, playing: true, team: 'blue', position: 'def', exp: 1121, },
        ];

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(users(stateBefore, action)).toEqual(stateAfter);
    });

    it('should swap sides', () => {
        const stateBefore = [
            {id: 1, playing: true, team: 'red', position: 'att'},
            {id: 2, playing: true, team: 'red', position: 'def'},
            {id: 3, playing: true, team: 'blue', position: 'att'},
            {id: 4, playing: true, team: 'blue', position: 'def'},
        ];
        const action = actions.swapSides();
        const stateAfter = [
            {id: 1, playing: true, team: 'blue', position: 'att'},
            {id: 2, playing: true, team: 'blue', position: 'def'},
            {id: 3, playing: true, team: 'red', position: 'att'},
            {id: 4, playing: true, team: 'red', position: 'def'},
        ];

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(users(stateBefore, action)).toEqual(stateAfter);
    });

    it('should swap positions', () => {
        const stateBefore = [
            {id: 1, playing: true, team: 'red', position: 'att'},
            {id: 2, playing: true, team: 'red', position: 'def'},
            {id: 3, playing: true, team: 'blue', position: 'att'},
            {id: 4, playing: true, team: 'blue', position: 'def'},
        ];
        const action = actions.swapPositions();
        const stateAfter = [
            {id: 1, playing: true, team: 'red', position: 'def'},
            {id: 2, playing: true, team: 'red', position: 'att'},
            {id: 3, playing: true, team: 'blue', position: 'def'},
            {id: 4, playing: true, team: 'blue', position: 'att'},
        ];

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(users(stateBefore, action)).toEqual(stateAfter);
    });

    it('should update users list', () => {
        const stateBefore = [
            {id: 1, playing: true, team: 'red', position: 'att', exp: 1000, },
            {id: 2, playing: true, team: 'red', position: 'def', exp: 1000, },
            {id: 3, playing: true, team: 'blue', position: 'att', exp: 1000, },
            {id: 4, playing: true, team: 'blue', position: 'def', exp: 1000, },
            {id: 5, exp: 1000, },
        ];
        const action = actions.updateUsers([
            {id: 3, exp: 1050, },
            {id: 4, exp: 1050, },
            {id: 5, exp: 1050, },
        ]);
        const stateAfter = getSortedUsers([
            {id: 1, playing: true, team: 'red', position: 'att', exp: 1000, },
            {id: 2, playing: true, team: 'red', position: 'def', exp: 1000, },
            {id: 3, playing: true, team: 'blue', position: 'att', exp: 1050, },
            {id: 4, playing: true, team: 'blue', position: 'def', exp: 1050, },
            {id: 5, exp: 1050, },
        ], 'exp', false);

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(users(stateBefore, action)).toEqual(stateAfter);
    });

    it('should not change state on default action', () => {
        const state = {
            users: [],
        };
        const action = { type: 'NULL::DEFAULT', };
        deepFreeze(state);
        deepFreeze(action);
        expect(users(state, action)).toEqual(state);
    });

    // it('should set users as empty array on wrong response', () => {
    //     const stateBefore = [
    //         {id: 1, playing: true, team: 'red', position: 'att', exp: 1000, },
    //         {id: 2, playing: true, team: 'red', position: 'def', exp: 1000, },
    //         {id: 3, playing: true, team: 'blue', position: 'att', exp: 1000, },
    //         {id: 4, playing: true, team: 'blue', position: 'def', exp: 1000, },
    //         {id: 5, exp: 1000, },
    //     ];
    //     const action = actions.receiveUsers({});
    //     const stateAfter = [];
    //
    //     deepFreeze(stateBefore);
    //     deepFreeze(action);
    //
    //     expect(() => users(stateBefore, action)).not.toThrowError();
    //     expect(users(stateBefore, action)).toEqual(stateAfter);
    // });
});

describe('Sorting users by column', () => {
    it('should sort by exp ascending', () => {
        const stateBefore = [
            {id: 1, playing: true, team: 'red', position: 'att', exp: 978, },
            {id: 2, playing: true, team: 'red', position: 'def', exp: 1015, },
            {id: 3, playing: true, team: 'blue', position: 'att', exp: 866, },
            {id: 4, playing: true, team: 'blue', position: 'def', exp: 1121, },
            {id: 5, exp: 1004, },
        ];
        const stateAfter = [
            {id: 3, playing: true, team: 'blue', position: 'att', exp: 866, },
            {id: 1, playing: true, team: 'red', position: 'att', exp: 978, },
            {id: 5, exp: 1004, },
            {id: 2, playing: true, team: 'red', position: 'def', exp: 1015, },
            {id: 4, playing: true, team: 'blue', position: 'def', exp: 1121, },
        ];

        deepFreeze(stateBefore);
        expect(getSortedUsers(stateBefore, 'exp', true)).toEqual(stateAfter);
    });

    it('should sort by exp descending', () => {
        const stateBefore = [
            {id: 1, playing: true, team: 'red', position: 'att', exp: 978, },
            {id: 2, playing: true, team: 'red', position: 'def', exp: 1015, },
            {id: 3, playing: true, team: 'blue', position: 'att', exp: 866, },
            {id: 4, playing: true, team: 'blue', position: 'def', exp: 1121, },
            {id: 5, exp: 1004, },
        ];
        const stateAfter = [
            {id: 4, playing: true, team: 'blue', position: 'def', exp: 1121, },
            {id: 2, playing: true, team: 'red', position: 'def', exp: 1015, },
            {id: 5, exp: 1004, },
            {id: 1, playing: true, team: 'red', position: 'att', exp: 978, },
            {id: 3, playing: true, team: 'blue', position: 'att', exp: 866, },
        ];

        deepFreeze(stateBefore);
        expect(getSortedUsers(stateBefore, 'exp', false)).toEqual(stateAfter);
    });
});

describe('Entities reducer', function() {
    it('should add users', function() {
        const stateBefore = {
            entities: {}
        };
        const action = {
            type: fromUsers.RECEIVE_ALL,
            entities: {
                '0': { id: '0', username: 'User0', exp: 1000},
                '1': { id: '1', username: 'User1', exp: 1000},
                '2': { id: '2', username: 'User2', exp: 1000},
            }
        };
        const stateAfter = {
            entities: {
                '0': { id: '0', username: 'User0', exp: 1000},
                '1': { id: '1', username: 'User1', exp: 1000},
                '2': { id: '2', username: 'User2', exp: 1000},
            }
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(reducer(stateBefore, action).entities).toEqual(stateAfter.entities);
    });

    it('should update users', function() {
        const stateBefore = {
            entities: {
                '0': { id: '0', username: 'User0', exp: 1000},
                '1': { id: '1', username: 'User1', exp: 1000},
                '3': { id: '1', username: 'User3', exp: 1003},
            }
        };
        const action = {
            type: fromUsers.UPDATE_ALL,
            entities: {
                '0': { id: '0', username: 'User0', exp: 1000},
                '1': { id: '1', username: 'User1', exp: 1001},
                '2': { id: '2', username: 'User2', exp: 1002},
            }
        };
        const stateAfter = {
            entities: {
                '0': { id: '0', username: 'User0', exp: 1000},
                '1': { id: '1', username: 'User1', exp: 1001},
                '2': { id: '2', username: 'User2', exp: 1002},
                '3': { id: '1', username: 'User3', exp: 1003},
            }
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(reducer(stateBefore, action).entities).toEqual(stateAfter.entities);
    });

    it('should add user', function() {
        const stateBefore = {
            entities: {
                '0': { id: '0', username: 'User0', exp: 1000},
                '1': { id: '1', username: 'User1', exp: 1000},
                '3': { id: '3', username: 'User3', exp: 1000},
            }
        };
        const action = {
            type: fromUsers.ADD,
            userData: {
                id: '2', username: 'User2', exp: 1000,
            },
        };
        const stateAfter = {
            entities: {
                '0': { id: '0', username: 'User0', exp: 1000},
                '1': { id: '1', username: 'User1', exp: 1000},
                '2': { id: '2', username: 'User2', exp: 1000},
                '3': { id: '3', username: 'User3', exp: 1000},
            }
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(reducer(stateBefore, action).entities).toEqual(stateAfter.entities);
    });

    it('should update user', function() {
        const stateBefore = {
            entities: {
                '0': { id: '0', username: 'User0', exp: 1000},
                '1': { id: '1', username: 'User1', exp: 1000},
                '3': { id: '3', username: 'User3', exp: 1000},
            }
        };
        const action = {
            type: fromUsers.UPDATE,
            userData: {
                id: '3', username: 'User3', exp: 1003,
            },
        };
        const stateAfter = {
            entities: {
                '0': { id: '0', username: 'User0', exp: 1000},
                '1': { id: '1', username: 'User1', exp: 1000},
                '3': { id: '3', username: 'User3', exp: 1003},
            }
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(reducer(stateBefore, action).entities).toEqual(stateAfter.entities);
    });

    it('should delete user', function() {
        const stateBefore = {
            entities: {
                '0': { id: '0', username: 'User0', exp: 1000},
                '1': { id: '1', username: 'User1', exp: 1000},
                '3': { id: '3', username: 'User3', exp: 1000},
            }
        };
        const action = {
            type: fromUsers.DELETE,
            id: '3',
        };
        const stateAfter = {
            entities: {
                '0': { id: '0', username: 'User0', exp: 1000},
                '1': { id: '1', username: 'User1', exp: 1000},
            }
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(reducer(stateBefore, action).entities).toEqual(stateAfter.entities);
    });
});

describe('Selected reducer', function() {
    it('should add selected user', function() {
        const stateBefore = { selected: ['1', '5', '9'] };
        const action = {
            type: fromUsers.TOGGLE,
            id: '4',
        };
        const stateAfter = { selected: ['1', '5', '9', '4'] };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(reducer(stateBefore, action).selected).toEqual(stateAfter.selected);
    });

    it('should remove selected user', function() {
        const stateBefore = { selected: ['1', '4', '5', '9'] };
        const action = {
            type: fromUsers.TOGGLE,
            id: '4',
        };
        const stateAfter = { selected: ['1', '5', '9'] };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(reducer(stateBefore, action).selected).toEqual(stateAfter.selected);
    });
});

describe('Positions reducer', function() {
    it('should swap sides', function() {
        const stateBefore = {
            positions: {
                red: {att: 1, def: 2},
                blue: {att: 3, def: 4},
            }
        };
        const action = {
            type: fromUsers.SWAP_SIDES,
        };
        const stateAfter = {
            positions: {
                red: {att: 3, def: 4},
                blue: {att: 1, def: 2},
            }
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(reducer(stateBefore, action).positions).toEqual(stateAfter.positions);
    });

    it('should swap positions', function() {
        const stateBefore = {
            positions: {
                red: {att: 1, def: 2},
                blue: {att: 3, def: 4},
            }
        };
        const action = {
            type: fromUsers.SWAP_POSITIONS,
        };
        const stateAfter = {
            positions: {
                red: {att: 2, def: 1},
                blue: {att: 4, def: 3},
            }
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(reducer(stateBefore, action).positions).toEqual(stateAfter.positions);
    });

    it('should update choice', function() {
        const stateBefore = {
            positions: {
                red: {att: 1, def: 2},
                blue: {att: 3, def: 4},
            }
        };
        const action = {
            type: fromUsers.CHOOSE,
            payload: {
                red: {att: 5, def: 7},
                blue: {att: 6, def: 8},
            }
        };
        const stateAfter = {
            positions: {
                red: {att: 5, def: 7},
                blue: {att: 6, def: 8},
            }
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(reducer(stateBefore, action).positions).toEqual(stateAfter.positions);
    });
});
