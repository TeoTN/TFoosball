import deepFreeze from 'deep-freeze';
import usersMock from '../assets/mocks/users.json';
import * as usersReducers from '../users/users.reducer';
import * as usersActions from '../users/users.actions';


describe('Metadata reducer', function() {
    it('should stop loading after users were received', function() {
        const stateBefore = {
            loadingEntities: true,
            loadedEntities: false,
        };
        const action = usersActions.receiveUsers(usersMock);
        const stateAfter = {
            loadingEntities: false,
            loadedEntities: true,
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.meta(stateBefore, action)).toEqual(stateAfter);
    });

    it('should stop loading after users were updated', function() {
        const stateBefore = {
            loadingEntities: true,
            loadedEntities: false,
        };
        const action = usersActions.updateUsers(usersMock);
        const stateAfter = {
            loadingEntities: false,
            loadedEntities: true,
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.meta(stateBefore, action)).toEqual(stateAfter);
    });

    it('should handle error while fetching users', function() {
        const stateBefore = {
            loadingEntities: true,
            loadedEntities: false,
        };
        const action = usersActions.errorFetchingEntities();
        const stateAfter = {
            loadingEntities: false,
            loadedEntities: false,
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.meta(stateBefore, action)).toEqual(stateAfter);
    });

    it('should mark as loading after having started fetching', function() {
        const stateBefore = {
            loadingEntities: false,
            loadedEntities: false,
        };
        const action = usersActions.fetchEntities();
        const stateAfter = {
            loadingEntities: true,
            loadedEntities: false,
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.meta(stateBefore, action)).toEqual(stateAfter);
    });
});

describe('Metadata selectors', function() {
    it('should get metadata', function() {
        const meta = {
            loadingEntities: true,
            loadedEntities: false,
        };
        const state = {
            users: {
                meta,
                entities: {},
                others: {},
            },
        };
        expect(usersReducers.getMetadata(state)).toEqual(meta);
    })
});

describe('Users positions', function() {
    it('...', function() {

    })
});

describe('Positions selectors', function() {
    it('should get positions', function() {
        const state = {
            users: {
                positions: {
                    playing: [1, 2, 3, 4],
                    red: [1, 3],
                    blue: [2, 4],
                    att: [1, 2],
                    def: [3, 4],
                }
            }
        };
        deepFreeze(state);
        const positions = usersReducers.getUsersPlayingById(state);
        expect(positions).toEqual({
            red_att: 1,
            red_def: 3,
            blue_att: 2,
            blue_def: 4,
        });
    });

    it('should tell that positions are set', function() {
        const state = {
            users: {
                positions: {
                    playing: [1, 2, 3, 4],
                    red: [1, 3],
                    blue: [2, 4],
                    att: [1, 2],
                    def: [3, 4],
                }
            }
        };
        deepFreeze(state);
        const arePositionsSet = usersReducers.arePositionsSet(state);
        expect(arePositionsSet).toEqual(true);
    });

    it('should tell that positions are NOT set', function() {
        const state = {
            users: {
                positions: {
                    playing: [1, 2, 3,],
                    red: [1, 3],
                    blue: [2,],
                    att: [1, 2],
                    def: [3,],
                }
            }
        };
        deepFreeze(state);
        const arePositionsSet = usersReducers.arePositionsSet(state);
        expect(arePositionsSet).toEqual(false);
    });

    it('should get appropriate players by positions', function() {
        const state = {
            users: {
                positions: {
                    playing: [1, 2, 3, 4],
                    red: [1, 3],
                    blue: [2, 4],
                    att: [1, 2],
                    def: [3, 4],
                }
            }
        };
        deepFreeze(state);
        expect(usersReducers.getRedAtt(state)).toEqual(1);
        expect(usersReducers.getRedDef(state)).toEqual(3);
        expect(usersReducers.getBlueAtt(state)).toEqual(2);
        expect(usersReducers.getBlueDef(state)).toEqual(4);
    });

    it('should get users playing', function() {
        const user1 = {username: 'a'};
        const user2 = {username: 'b'};
        const user3 = {username: 'c'};
        const user4 = {username: 'd'};
        const state = {
            users: {
                entities: {
                    1: user1, 2: user2, 3: user3, 4: user4,
                },
                positions: {
                    playing: [1, 2, 3, 4],
                    red: [1, 3],
                    blue: [2, 4],
                    att: [1, 2],
                    def: [3, 4],
                }
            }
        };

        deepFreeze(state);
        expect(usersReducers.getUsersPlaying(state)).toEqual({
            red_att: user1,
            red_def: user3,
            blue_att: user2,
            blue_def: user4,
        });
    });

    it('should get top 3 users', function() {
        const user1 = {username: 'a', exp: 1000};
        const user2 = {username: 'b', exp: 1020};
        const user3 = {username: 'c', exp: 1111};
        const user4 = {username: 'd', exp: 1070};
        const user5 = {username: 'e', exp: 999};
        const state = {
            users: {
                entities: {
                    1: user1, 2: user2, 3: user3, 4: user4, 5: user5,
                }
            }
        };
        deepFreeze(state);
        expect(usersReducers.getTop3(state)).toEqual([user3, user4, user2]);
    });

    it('should get users sorted by username', function() {
        const user1 = {username: 'a', exp: 1000};
        const user2 = {username: 'b', exp: 1020};
        const user3 = {username: 'c', exp: 1111};
        const user4 = {username: 'd', exp: 1070};
        const user5 = {username: 'e', exp: 999};
        const state = {
            users: {
                entities: {
                    1: user1, 2: user2, 3: user3, 4: user4, 5: user5,
                },
                sorting: {column: 'username', isAscendingOrder: true}
            },
        };
        deepFreeze(state);
        expect(usersReducers.getUsersSorted(state)).toEqual([user1, user2, user3, user4, user5]);
    });

    it('should get users sorted by exp', function() {
        const user1 = {username: 'a', exp: 1000};
        const user2 = {username: 'b', exp: 1020};
        const user3 = {username: 'c', exp: 1111};
        const user4 = {username: 'd', exp: 1070};
        const user5 = {username: 'e', exp: 999};
        const state = {
            users: {
                entities: {
                    1: user1, 2: user2, 3: user3, 4: user4, 5: user5,
                },
                sorting: {column: 'exp', isAscendingOrder: false}
            },
        };
        deepFreeze(state);
        expect(usersReducers.getUsersSorted(state)).toEqual([user3, user4, user2, user1, user5]);
    });
});
