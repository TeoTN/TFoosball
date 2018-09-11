import { call, put } from 'redux-saga/effects';
import api from '../api/index';
import * as AuthActions from './auth.actions';
import { onSignIn, fetchProfile } from './auth.sagas';
import { fetchTeams, initTeam } from '../teams/teams.sagas';
import { browserHistory } from 'react-router'


describe('SignIn saga', () => {
    describe('Scenario 1: Typical [Success]', () => {
        const iterator = onSignIn();
        const fixtureTeam = {
            id: 1,
            member_id: 7,
        };

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
