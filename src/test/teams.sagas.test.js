import { call, put, take, select, fork, cancel } from 'redux-saga/effects';
import { requestCreateTeam } from '../shared/teams/teams.actions';
import { teamCreationFlow, createTeam, fetchTeams, handleSelectTeam } from '../shared/teams/teams.sagas';
import { authenticate, fetchProfile } from '../shared/auth/auth.sagas';
import { browserHistory } from 'react-router';
import api from '../api';
import { showInfo, raiseError } from '../shared/notifier.actions';
import {
    REQUEST_CREATE_TEAM,
    REQUEST_JOIN_TEAM,
    SELECT_TEAM,
    MEMBER_ACCEPTANCE,
    teamCreated,
    setTeams,
    selectTeam,
    setPendingMembers,
} from '../shared/teams/teams.actions.js';

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
        expect(iterator.next(team).value).toEqual(call(fetchTeams));
    });

    it('should fetch user profile', () => {
        expect(iterator.next().value).toEqual(call(fetchProfile, team.id, team.member_id));
    });

    it('should redirect to /match page', () => {
        expect(iterator.next().value).toEqual(call([browserHistory, browserHistory.push], '/match'));
    });
});

describe('Create team saga - success scenario', () => {
    const team = {
        name: 'Team 0',
        username: 'Zbyszek',
    };
    const iterator = createTeam(team);
    const url = api.urls.teamList();

    it('should call api: POST request', () => {
        const iter = iterator.next(team).value;
        expect(iter).toEqual(call(api.requests.post, url, team, 'Team already exists'));
    });

    it('should put TEAM_CREATED', () => {
        const iter = iterator.next(team).value;
        expect(iter).toEqual(put(teamCreated(team)))
    });

    it('should put SHOW_INFO about created team', () => {
        const iter = iterator.next(team).value;
        expect(iter).toEqual(put(showInfo(`Team ${team.name} created.`)));
    });

    it('should SELECT_TEAM', () => {
        const iter = iterator.next(team).value;
        expect(iter).toEqual(put(selectTeam(team)));
    });

    it('should return from saga with team data', () => {
        const iter = iterator.next();
        expect(iter.done).toEqual(true);
    });
});

describe('Handle team selection', () => {
    const iterator = handleSelectTeam();
    const team = {
        id: 7,
        member_id: 15,
    };

    it('should wait to take SELECT_TEAM', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(take(SELECT_TEAM));
    });

    it('should fetch profile', () => {
        const iter = iterator.next(selectTeam(team)).value;
        expect(iter).toEqual(call(fetchProfile, team.id, team.member_id));
    });

    it('should redirect to /match', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(call([browserHistory, browserHistory.push], '/match'));
    });

    it('should not return from saga', () => {
        const iter = iterator.next();
        expect(iter.done).toEqual(false);
    });
});
