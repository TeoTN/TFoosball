import deepFreeze from 'deep-freeze';
import usersMock from '../assets/mocks/users.json';
import * as usersReducers from '../users/users.reducer';
import * as usersActions from '../users/users.actions';
import { users } from "../users/users.sagas";


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

describe('Sorting reducer', function() {
    it('should NOT modify state on unknown action', function() {
        const sortingState = {column: 'exp', isAscendingOrder: false};
        const action = {type: 'UNKNOWN'};
        deepFreeze(sortingState);
        deepFreeze(action);
        expect(usersReducers.sorting(sortingState, action)).toEqual(sortingState);
    });

    it('should set column and order', function() {
        const stateBefore = {column: 'exp', isAscendingOrder: false};
        const action = usersActions.sortBy('username', true);
        const stateAfter = {column: 'username', isAscendingOrder: true};

        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.sorting(stateBefore, action)).toEqual(stateAfter);
    });
});

describe('Autocompletion reducer', function() {
    it('should NOT modify state on unknown action', function() {
        const stateBefore = {loading: false, emails: [],};
        const action = {type: 'UNKNOWN'};
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.autocompletion(stateBefore, action)).toEqual(stateBefore);
    });

    it('should mark as loading after fetch action', function() {
        const stateBefore = {loading: false, emails: [],};
        const action = usersActions.fetchEmailAutocompletion('abc');
        const stateAfter = {loading: true, emails: [],};
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.autocompletion(stateBefore, action)).toEqual(stateAfter);
    });

    it('should store suggestions when received data from email autocompletion service', function() {
        const stateBefore = {loading: true, emails: [],};
        const action = usersActions.receivedEmailAutocompletion(['abc@example.com']);
        const stateAfter = {loading: false, emails: ['abc@example.com'],};
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.autocompletion(stateBefore, action)).toEqual(stateAfter);
    });
});

describe('Positions reducer', function() {
    it('should NOT modify state on unknown action', function() {
        const stateBefore = {playing: [], red: [], blue: [], att: [], def: [],};
        const action = {type: 'UNKNOWN'};
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.positions(stateBefore, action)).toEqual(stateBefore);
    });

    it('should swap sides', function() {
        const stateBefore = {
            playing: [1, 2, 3, 4],
            red: [1, 3],
            blue: [2, 4],
            att: [1, 2],
            def: [3, 4],
        };
        const action = usersActions.swapSides();
        const stateAfter = {
            playing: [1, 2, 3, 4],
            red: [2, 4],
            blue: [1, 3],
            att: [1, 2],
            def: [3, 4],
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.positions(stateBefore, action)).toEqual(stateAfter);
    });

    it('should swap positions', function() {
        const stateBefore = {
            playing: [1, 2, 3, 4],
            red: [1, 3],
            blue: [2, 4],
            att: [1, 2],
            def: [3, 4],
        };
        const action = usersActions.swapPositions();
        const stateAfter = {
            playing: [1, 2, 3, 4],
            red: [1, 3],
            blue: [2, 4],
            att: [3, 4],
            def: [1, 2],
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.positions(stateBefore, action)).toEqual(stateAfter);
    });

    it('should update choice', function() {
        const stateBefore = {
            playing: [1, 2, 3, 4],
            red: [1, 3],
            blue: [2, 4],
            att: [1, 2],
            def: [3, 4],
        };
        // Notice action creator choosePlayersForMatch is not deterministic
        const action = {
            type: usersActions.CHOOSE,
            payload: {
                playing: [3, 4, 2, 1],
                red: [2, 1],
                blue: [3, 4],
                att: [2, 3],
                def: [1, 4],
            }
        };
        const stateAfter = {
            playing: [3, 4, 2, 1],
            red: [2, 1],
            blue: [3, 4],
            att: [2, 3],
            def: [1, 4],
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.positions(stateBefore, action)).toEqual(stateAfter);
    });

    it('should assign user', function() {
        const stateBefore = {playing: [], red: [], blue: [], att: [], def: [],};
        const action = usersActions.userAssign({id: 1}, 'blue', 'def');
        const stateAfter = {playing: [1], red: [], blue: [1], att: [], def: [1],};

        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.positions(stateBefore, action)).toEqual(stateAfter);
    });

    it('should replace user', function() {
        const stateBefore = {
            playing: [3, 4, 2, 1],
            red: [2, 1],
            blue: [3, 4],
            att: [2, 3],
            def: [1, 4],
        };
        const action = usersActions.userAssign({id: 2}, 'blue', 'def');
        const stateAfter = {
            playing: [3, 1, 2],
            red: [1],
            blue: [3, 2],
            att: [3],
            def: [1, 2],
        };

        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.positions(stateBefore, action)).toEqual(stateAfter);
    });
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

describe('Selected reducer', function() {
    it('should NOT modify state on unknown action', function() {
        const stateBefore = [5, 3, 1];
        const action = {type: 'UNKNOWN'};
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.selected(stateBefore, action)).toEqual(stateBefore);
    });

    it('should select user', function() {
        const stateBefore = [5, 3, 1];
        const action = usersActions.userToggle({id: 2});
        const stateAfter = [5, 3, 1, 2];
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.selected(stateBefore, action)).toEqual(stateAfter);
    });

    it('should unselect user', function() {
        const stateBefore = [5, 3, 1];
        const action = usersActions.userToggle({id: 3});
        const stateAfter = [5, 1];
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.selected(stateBefore, action)).toEqual(stateAfter);
    });

});

describe('Entities reducer', function() {
    it('should NOT modify state on unknown action', function() {
        const stateBefore = {
            1: {username: 'a'}
        };
        const action = {type: 'UNKNOWN'};
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.entities(stateBefore, action)).toEqual(stateBefore);
    });

    it('should handle receiving user list', function() {
        const stateBefore = {
            1: {id: 1, username: 'a'}
        };
        const action = usersActions.receiveUsers([
            {id: 11, username: 'k'},
            {id: 17, username: 'q'},
        ]);
        const stateAfter = {
            11: {id: 11, username: 'k'},
            17: {id: 17, username: 'q'},
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.entities(stateBefore, action)).toEqual(stateAfter);
    });

    it('should update user list', function() {
        const stateBefore = {
            1: {id: 1, username: 'a'}
        };
        const action = usersActions.updateUsers([
            {id: 11, username: 'k'},
            {id: 17, username: 'q'},
        ]);
        const stateAfter = {
            1: {id: 1, username: 'a'},
            11: {id: 11, username: 'k'},
            17: {id: 17, username: 'q'},
        };
        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(usersReducers.entities(stateBefore, action)).toEqual(stateAfter);
    });
});
