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
        const positions = usersReducers.getUsersPlayingById(state);
        expect(positions).toEqual({
            red_att: 1,
            red_def: 3,
            blue_att: 2,
            blue_def: 4,
        });
    });
});
