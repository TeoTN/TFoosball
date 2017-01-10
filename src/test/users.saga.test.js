import { call, put } from 'redux-saga/effects';
import * as API from '../api/connectors';
import response from '../mocks/users.json';
import * as UserActions from '../actions/user.actions';
import * as ErrorActions from '../actions/error.actions';
import { fetchUsers } from '../sagas/users.js';

describe('Fetch user list - success scenario', () => {
    const iterator = fetchUsers();

    it('should call fetch api', () => {
        expect(iterator.next().value).toEqual(call(API.fetchUsers));
    });

    it('should put response action', () => {
        expect(iterator.next(response).value).toEqual(put(UserActions.receiveUsers(response)));
    });
});

describe('Fetch user list - failure scenario', () => {
    const iterator = fetchUsers();
    const errorMsg = 'Unable to fetch user list';

    it('should call fetch api', () => {
        expect(iterator.next().value).toEqual(call(API.fetchUsers));
    });

    it('should put raise error action', () => {
        expect(iterator.throw(errorMsg).value).toEqual(put(ErrorActions.raiseError(errorMsg)));
    });
});