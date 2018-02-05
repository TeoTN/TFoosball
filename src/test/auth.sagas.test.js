import { call, put, take, select, fork, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import { prepareWindow } from '../api/oauth';
import api from '../api';
import * as AuthActions from '../shared/auth/auth.actions';
import { clean, raiseError } from '../shared/notifier.actions';
import { authenticate, onSignIn, onSignOut, fetchProfile } from '../shared/auth/auth.sagas';
import { getOAuthErrorMsg } from '../shared/auth/auth.utils';
import { fetchTeams, initTeam } from '../teams/teams.sagas';
import { removeState } from '../persistence';
import { browserHistory } from 'react-router'
import { getToken } from "../shared/auth/auth.reducer";


describe('Authenticate saga', () => {
    describe('Scenario 1: OAuth window - success', () => {
        const iterator = authenticate();
        const fixture = { token: 'some_token_value' };

        it('should check if token exists', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(getToken));
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
            expect(iter).toEqual(fixture.token);
            expect(iterator.next().done).toEqual(true);
        });
    });

    describe('Scenario 2: OAuth window - already authenticated', () => {
        const iterator = authenticate();
        const fixture = { token: 'some_token_value' };

        it('should check if token exists', () => {
            const iter = iterator.next(fixture).value;
            expect(iter).toEqual(select(getToken));
        });

        it('should return token and complete', () => {
            const iter = iterator.next(fixture.token).value;
            expect(iter).toEqual(fixture);
            expect(iterator.next().done).toEqual(true);
        });
    });

    describe('Scenario 3: OAuth window - failure scenario', () => {
        const iterator = authenticate();
        const fixture = { error: 'failure' };

        it('should check if token exists', () => {
            const iter = iterator.next(fixture).value;
            expect(iter).toEqual(select(getToken));
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
            expect(iter).toEqual('');
            expect(iterator.next().done).toEqual(true);
        });
    });
});


describe('SignIn saga', () => {
    describe('Scenario 1: Typical [Success]', () => {
        const iterator = onSignIn();
        const fixtureTeam = {
            id: 1,
            member_id: 7,
        };

        it('should call Authenticate saga', () => {
            expect(iterator.next().value).toEqual(call(authenticate));
        });

        it('should call FetchTeams saga', () => {
            expect(iterator.next('token').value).toEqual(call(fetchTeams));
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

    describe('Scenario 2: User not assigned to any team', () => {
        const iterator = onSignIn();

        it('should call Authenticate saga', () => {
            expect(iterator.next().value).toEqual(call(authenticate));
        });

        it('should call FetchTeams saga', () => {
            expect(iterator.next('token').value).toEqual(call(fetchTeams));
        });

        it('should call InitTeam saga', () => {
            expect(iterator.next().value).toEqual(call(initTeam));
        });

        it('should return from saga', () => {
            expect(iterator.next().done).toEqual(true);
        });
    });
});

describe('Fetch profile saga', () => {
    const team = {id: 1, member_id: 7};
    const iterator = fetchProfile(team.id, team.member_id);
    const profile_url = api.urls.teamMemberEntity(team.id, team.member_id);
    const profile = { username: 'Heniek' };

    it('should fetch profile from API', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(call(api.requests.get, profile_url, {}, 'Failed to load user profile'));
    });

    it('should set profile in store', () => {
        const iter = iterator.next(profile).value;
        expect(iter).toEqual(put(AuthActions.setProfile(profile)));
    });

    it('should return from saga', () => {
        const iter = iterator.next();
        expect(iter.done).toEqual(true);
    });
});
