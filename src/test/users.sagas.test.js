import { call, put, select } from 'redux-saga/effects';
import api from '../api';
import response from '../assets/mocks/users.json';
import * as UserActions from '../users/user.actions';
import { raiseError } from '../shared/notifier.actions';
import { fetchUsers, fetchUpdateUsers } from '../users/users.sagas.js';
import { getCurrentTeam } from '../teams/teams.sagas';

describe('FetchUsers saga ', () => {
    const iterator = fetchUsers();
    const currentTeam = {id: 1};
    const url = api.urls.teamMemberList(currentTeam.id);

    describe('Scenario 1 - success scenario', () => {
        it('should select team id', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(call(getCurrentTeam));
        });

        it('should call fetch api', () => {
            expect(iterator.next(currentTeam).value).toEqual(call(api.requests.get, url));
        });

        it('should put response action', () => {
            const iter = iterator.next(response).value;
            expect(iter).toEqual(put(UserActions.receiveUsers(response)));
        });

        it('should return from saga', () => {
            const iter = iterator.next().done;
            expect(iter).toBe(true);
        });
    });


    describe('Scenario 2: - failure scenario', () => {
        const iterator = fetchUsers();
        const errorMsg = 'Unable to fetch user list';

        it('should select team id', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(call(getCurrentTeam));
        });

        it('should call fetch api', () => {
            const iter = iterator.next(currentTeam).value;
            expect(iter).toEqual(call(api.requests.get, url));
        });

        it('should put raise error action', () => {
            const iter = iterator.throw(errorMsg).value;
            expect(iter).toEqual(put(raiseError(errorMsg)));
        });

        it('should return from saga', () => {
            const iter = iterator.next().done;
            expect(iter).toBe(true);
        });
    });

});


describe('FetchUpdateUsers saga', () => {
    const currentTeam = { id: 6 };
    const url = api.urls.teamMemberList(currentTeam.id);
    const response = [{id: 6}, {id: 7}];
    const errorMsg = 'Failed to fetch users list';

    describe('Scenario 1: Success', () => {
        const iterator = fetchUpdateUsers();

        it('should call to get current team', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(call(getCurrentTeam))
        });

        it('should call API to get team users list', () => {
            const iter = iterator.next(currentTeam).value;
            expect(iter).toEqual(call(api.requests.get, url, {}, errorMsg));
        });

        it('should put updateUsers action', () => {
            const iter = iterator.next(response).value;
            expect(iter).toEqual(put(UserActions.updateUsers(response)));
        });

        it('should return from saga', () => {
            const iter = iterator.next(response).done;
            expect(iter).toBe(true);
        });
    });

    describe('Scenario 2: Failure', () => {
        const iterator = fetchUpdateUsers();

        it('should call to get current team', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(call(getCurrentTeam))
        });

        it('should call API to get team users list', () => {
            const iter = iterator.next(currentTeam).value;
            expect(iter).toEqual(call(api.requests.get, url, {}, errorMsg));
        });

        it('should put updateUsers action', () => {
            const iter = iterator.throw(errorMsg).value;
            expect(iter).toEqual(put(raiseError(errorMsg)));
        });

        it('should return from saga', () => {
            const iter = iterator.next(response).done;
            expect(iter).toBe(true);
        });
    });
});
