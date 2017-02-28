import { call, put, take, select, fork, cancel } from 'redux-saga/effects';
import { requestCreateTeam } from '../shared/teams/teams.actions';
import { teamCreationFlow, createTeam, fetchTeams } from '../shared/teams/teams.sagas';
import { authenticate, fetchProfile } from '../shared/auth.sagas';
import { browserHistory } from 'react-router';

describe('Team creation flow saga - success scenario', () => {
    const iterator = teamCreationFlow();
    const action = requestCreateTeam('Team', 'Username');
    const team = { id: 1, name: 'Team', member_id: 7 };

    it('should wait for REQUEST_CREATE_TEAM', () => {
        expect(iterator.next().value).toEqual(take(action.type));
    });

    it('should attempt authenticating user', () => {
        const iter = iterator.next(action).value;
        expect(iter).toEqual(call(authenticate));
    });

    it('should invoke createTeam saga', () => {
        expect(iterator.next().value).toEqual(call(createTeam, action));
    });

    it('should fetch user\'s teams', () => {
        expect(iterator.next().value).toEqual(call(fetchTeams));
    });

    it('should fetch user profile', () => {
        expect(iterator.next().value).toEqual(call(fetchProfile, team.id, team.member_id));
    });

    it('should redirect to /match page', () => {
        expect(iterator.next().value).toEqual(call([browserHistory, browserHistory.push], '/match'));
    })
});