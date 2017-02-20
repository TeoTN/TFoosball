import { call, put, take, select, fork, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import { prepareWindow } from '../api/oauth';
import api from '../api';
import * as AuthActions from '../shared/auth.actions';
import { clean, raiseError } from '../shared/notifier.actions';
import { authenticate, loginFlow, getOAuthErrorMsg, signIn, fetchProfile } from '../shared/auth.sagas';
import { fetchTeams, initTeam } from '../shared/teams/teams.sagas';
import { removeState } from '../persistence';
import profile from '../assets/mocks/profile.json';
import { browserHistory } from 'react-router'


describe('Authenticate: OAuth window success scenario', () => {
    const iterator = authenticate();
    const fixture = { token: 'some_token_value' };

    it('should check if token exists', () => {
        const iter = iterator.next().value;
        expect(JSON.stringify(iter)).toEqual(JSON.stringify(select()))
    });

    it('should yield an effect call([promptWindow, open])', () => {
        const promptWindow = prepareWindow();
        const iter1 = iterator.next().value;
        const call1 = call([promptWindow, promptWindow.open]);
        expect(JSON.stringify(iter1)).toEqual(JSON.stringify(call1));
    });

    it('should yield an effect put(setToken(token))', () => {
        expect(iterator.next(fixture).value).toEqual(put(AuthActions.setToken(fixture.token)));
    });

    it('should return token and complete', () => {
        const iter = iterator.next(fixture.token).value;
        expect(iter).toEqual(fixture);
        expect(iterator.next().done).toEqual(true);
    });
});

describe('Authenticate: OAuth window already authenticated', () => {
    const iterator = authenticate();
    const fixture = { token: 'some_token_value' };

    it('should check if token exists', () => {
        const iter = iterator.next(fixture).value;
        expect(JSON.stringify(iter)).toEqual(JSON.stringify(select()))
    });

    it('should return token and complete', () => {
        const iter = iterator.next(fixture.token).value;
        expect(iter).toEqual(fixture);
        expect(iterator.next().done).toEqual(true);
    });
});

describe('Authenticate: OAuth window failure scenario', () => {
    const iterator = authenticate();
    const fixture = { error: 'failure' };

    it('should check if token exists', () => {
        const iter = iterator.next(fixture).value;
        expect(JSON.stringify(iter)).toEqual(JSON.stringify(select()))
    });

    it('should yield an effect call([promptWindow, open])', () => {
        const promptWindow = prepareWindow();
        const iter = iterator.next().value;
        const called = call([promptWindow, promptWindow.open]);
        expect(JSON.stringify(iter)).toEqual(JSON.stringify(called));
    });

    it('should yield an effect put(raiseError(errorMsg))', () => {
        const errorMsg = getOAuthErrorMsg(fixture);
        expect(iterator.throw(fixture).value).toEqual(put(raiseError(errorMsg)));
    });

    it('should complete', () => {
        const iter = iterator.next('some-token').value;
        expect(iter).toEqual({});
        expect(iterator.next().done).toEqual(true);
    });
});

describe('SignIn saga', () => {
    const iterator = signIn();
    const fixtureTeam = {
        id: 1,
        member_id: 7,
    };

    it('should wait for action SIGN_IN', () => {
        expect(iterator.next(AuthActions.signIn()).value).toEqual(take(AuthActions.signIn().type));
    });

    it('should call Authenticate saga', () => {
        expect(iterator.next().value).toEqual(call(authenticate));
    });

    it('should call FetchTeams saga', () => {
        expect(iterator.next().value).toEqual(call(fetchTeams));
    });

    it('should call InitTeam saga', () => {
        expect(iterator.next().value).toEqual(call(initTeam));
    });

    it('should call FetchProfile saga', () => {
        expect(iterator.next(fixtureTeam).value).toEqual(call(fetchProfile, fixtureTeam.id, fixtureTeam.member_id));
    });

    it('should navigate to root and finish', () => {
        expect(iterator.next().value).toEqual(call([browserHistory, browserHistory.push], `/match`));
        expect(iterator.next().done).toEqual(true);
    });

});

describe('Login flow', () => {
    const iterator = loginFlow();

    describe('success scenario', () => {
        let signInSaga;
        it('should fork SignIn saga', () => {
            signInSaga = fork(signIn);
            expect(iterator.next().value).toEqual(signInSaga);
        });

        it('should wait for SIGN_OUT action', () => {
            expect(iterator.next(createMockTask()).value).toEqual(take(AuthActions.signOut().type));
        });

        it('should cancel SignIn saga', () => {
            expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(cancel(createMockTask())));
        });

        it('should call API sign out', () => {
            const logout_url = api.urls.logout();
            const expected = call(api.requests.get, logout_url, null, 'Failed to sign out. Please try again.');
            expect(iterator.next().value).toEqual(expected)
        });

        it('should dispatch SIGNED_OUT action', () => {
            expect(iterator.next().value).toEqual(put(AuthActions.signedOut()));
        });

        it('should clean notifications', () => {
            expect(iterator.next().value).toEqual(put(clean()));
        });

        it('should clean localStorage', () => {
            expect(iterator.next().value).toEqual(call(removeState));
        });

        it('should redirect to home page', () => {
            expect(iterator.next().value).toEqual(call([browserHistory, browserHistory.push], '/'));
        });

        it('should not complete the saga', () => {
            expect(iterator.next().done).toEqual(false); // Fork signIn again
        });
    });
});