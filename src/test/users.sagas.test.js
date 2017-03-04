import { call, put, select } from 'redux-saga/effects';
import api from '../api';
import response from '../assets/mocks/users.json';
import * as UserActions from '../users/user.actions';
import { raiseError } from '../shared/notifier.actions';
import { fetchUsers } from '../users/users.sagas.js';

describe('Fetch user list - success scenario', () => {
    const iterator = fetchUsers();
    const currentTeamId = 1;

    it('should select team id', () => {
        expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(select(() => currentTeamId)));
    });

    it('should call fetch api', () => {
        const url = api.urls.teamMemberList(currentTeamId);
        expect(iterator.next(currentTeamId).value).toEqual(call(api.requests.get, url));
    });

    it('should put response action', () => {
        expect(iterator.next(response).value).toEqual(put(UserActions.receiveUsers(response)));
    });
});

describe('Fetch user list - failure scenario', () => {
    const iterator = fetchUsers();
    const errorMsg = 'Unable to fetch user list';
    const currentTeamId = 1;

    it('should select team id', () => {
        expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(select(() => currentTeamId)));
    });

    it('should call fetch api', () => {
        const url = api.urls.teamMemberList(currentTeamId);
        expect(iterator.next(currentTeamId).value).toEqual(call(api.requests.get, url));
    });

    it('should put raise error action', () => {
        expect(iterator.throw(errorMsg).value).toEqual(put(raiseError(errorMsg)));
    });
});