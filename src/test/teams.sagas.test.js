import { call, put, take, select, throttle, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import * as teamSagas from '../teams/teams.sagas';
import * as teamActions from '../teams/teams.actions.js';
import { authenticate, fetchProfile } from '../shared/auth/auth.sagas';
import api from '../api';
import { showInfo, raiseError } from '../shared/notifier.actions';
import { showQuestionModal } from '../shared/modal.actions';
import { getMyRequestsPending, getSelectedTeam, getTeamBasics, getTeamsState, teams } from "../teams/teams.reducer";
import { getToken } from "../shared/auth/auth.reducer";
import { FETCH_AUTOCOMPLETION, INVITE, inviteUser, receivedEmailAutocompletion } from "../users/users.actions";
import { fetchUsers } from "../users/users.sagas";
import { initTeam } from "../teams/teams.sagas";


describe('TeamCreationFlow saga', () => {
    describe('Scenario 1: Typical [Success]', () => {
        const action = teamActions.requestCreateTeam('Team', 'Username');
        const iterator = teamSagas.onTeamCreate(action);
        const team = { id: 1, name: 'Team', member_id: 7 };

        it('should attempt authenticating user', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(call(authenticate));
        });

        it('should invoke createTeam saga', () => {
            expect(iterator.next().value).toEqual(call(teamSagas.createTeam, action));
        });

        it('should fetch user\'s teams', () => {
            expect(iterator.next(team).value).toEqual(call(teamSagas.fetchTeams));
        });

        it('should fetch user profile', () => {
            expect(iterator.next().value).toEqual(call(fetchProfile, team.id, team.member_id));
        });

        it('should redirect to /match page', () => {
            expect(iterator.next().value).toEqual(call([browserHistory, browserHistory.push], '/match'));
        });
    });
});

describe('CreateTeam saga - success scenario', () => {
    const team = {
        name: 'Team 0',
        username: 'Zbyszek',
    };
    const url = api.urls.teamList();

    describe('Scenario 1: Typical [Success]', () => {
        const iterator = teamSagas.createTeam(team);

        it('should call api: POST request', () => {
            const iter = iterator.next(team).value;
            expect(iter).toEqual(call(api.requests.post, url, team, 'Club already exists'));
        });

        it('should put TEAM_CREATED', () => {
            const iter = iterator.next(team).value;
            expect(iter).toEqual(put(teamActions.teamCreated(team)))
        });

        it('should put SHOW_INFO about created team', () => {
            const iter = iterator.next(team).value;
            expect(iter).toEqual(put(showInfo(`Club ${team.name} successfully created.`)));
        });

        it('should teamActions.SELECT_TEAM', () => {
            const iter = iterator.next(team).value;
            expect(iter).toEqual(put(teamActions.selectTeam(team)));
        });

        it('should return from saga with team data', () => {
            const iter = iterator.next();
            expect(iter.done).toEqual(true);
        });
    });
});

describe('HandleSelectTeam saga', () => {
    const team = {
        id: 7,
        member_id: 15,
        username: 'Axis'
    };
    const action = teamActions.selectTeam(team);
    const iterator = teamSagas.onTeamSelect(action);

    xit('should wait to take teamActions.SELECT_TEAM', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(take(teamActions.SELECT_TEAM));
    });

    it('should fetch profile', () => {
        const iter = iterator.next(teamActions.selectTeam(team)).value;
        expect(iter).toEqual(call(fetchProfile, team.id, team.member_id));
    });

    it('should redirect to new profile teams', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(call([browserHistory, browserHistory.push], `/clubs/joined`));
    });

    xit('should not return from saga', () => {
        const iter = iterator.next();
        expect(iter.done).toEqual(false);
        expect(iter.value).toEqual(take(teamActions.SELECT_TEAM));
    });
});

describe('FetchTeams saga', () => {
    const authenticatedStoreMock = {
        auth: {
            token: 'abc123',
        },
    };
    const unauthenticatedStoreMock = {};
    const responseMock = { teams: [{id: 5}, {id: 7},], pending: 0 };
    const errorMsg = 'Failed to fetch user clubs';

    describe('Scenario 1: Success', () => {
        const iterator = teamSagas.fetchTeams();

        it('should check whether token is present in store', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(getToken));
        });

        it('should call API to fetch user teams', () => {
            const iter = iterator.next(authenticatedStoreMock).value;
            const url = api.urls.teamListJoined();
            expect(iter).toEqual(call(api.requests.get, url, {}, errorMsg));
        });

        it('should put SET_TEAMS with returned team list', () => {
            const iter = iterator.next(responseMock).value;
            expect(iter).toEqual(put(teamActions.setTeams(responseMock)))
        });

        it('should return from the saga', () => {
            expect(iterator.next().done).toBe(true);
        });
    });

    describe('Scenario 2: Unauthenticated', () => {
        const iterator = teamSagas.fetchTeams();

        it('should check whether token is present in store', () => {
            const iter = iterator.next(unauthenticatedStoreMock).value;
            expect(iter).toEqual(select(getToken));
        });

        it('should call API to fetch user teams', () => {
            const iter = iterator.next();
            expect(iter.value).toBe(undefined);
            expect(iter.done).toBe(true);
        });
    });

    describe('Scenario 3: Fetch failed', () => {
        const iterator = teamSagas.fetchTeams();

        it('should check whether token is present in store', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(getToken));
        });

        it('should call API to fetch user teams', () => {
            const iter = iterator.next(authenticatedStoreMock).value;
            const url = api.urls.teamListJoined();
            expect(iter).toEqual(call(api.requests.get, url, {}, errorMsg));
        });

        it('should put RAISE_ERROR with errorMsg', () => {
            const iter = iterator.throw(errorMsg).value;
            expect(iter).toEqual(put(raiseError(errorMsg)));
        });

        it('should return from the saga', () => {
            expect(iterator.next().done).toBe(true);
        });
    });
});

describe('Init team', () => {
    describe('Scenario 1: Redirect fresher to welcome page', function() {
        const iterator = initTeam();

        it('should select state', function() {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(getTeamBasics));
        });

        it('should redirect', function() {
            const mockedState = {
                joinedTeams: [], defaultTeamId: undefined, selectedTeam: {},
            };
            const iter = iterator.next(mockedState).value;
            expect(iter).toEqual(call([browserHistory, browserHistory.push], '/welcome'));
        });

        it('should return from saga', function() {
            const iter = iterator.next().done;
            expect(iter).toEqual(true);
        });
    });

    describe('Scenario 2: Pick default team', function() {
        const iterator = initTeam();

        it('should select state', function() {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(getTeamBasics));
        });

        it('should redirect', function() {
            const mockedState = {
                joinedTeams: [{id: 1}, {id: 2}, {id: 3}, {id: 4}],
                defaultTeamId: 2,
                selectedTeam: {},
            };
            const iter = iterator.next(mockedState).value;
            expect(iter).toEqual(put(teamActions.selectTeam({id: 2})));
        });

        it('should return from saga', function() {
            const iter = iterator.next().done;
            expect(iter).toEqual(true);
        });
    });

    describe('Scenario 3: Pick selected team', function() {
        const iterator = initTeam();

        it('should select state', function() {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(getTeamBasics));
        });

        it('should redirect', function() {
            const mockedState = {
                joinedTeams: [{id: 1}, {id: 2}, {id: 3}, {id: 4}],
                defaultTeamId: undefined,
                selectedTeam: {id: 3},
            };
            const iter = iterator.next(mockedState).value;
            expect(iter).toEqual(put(teamActions.selectTeam({id: 3})));
        });

        it('should return from saga', function() {
            const iter = iterator.next().done;
            expect(iter).toEqual(true);
        });
    });

    describe('Scenario 4: Fallback to first joined team', function() {
        const iterator = initTeam();

        it('should select state', function() {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(getTeamBasics));
        });

        it('should redirect', function() {
            const mockedState = {
                joinedTeams: [{id: 1}, {id: 2}, {id: 3}, {id: 4}],
                defaultTeamId: undefined,
                selectedTeam: {},
            };
            const iter = iterator.next(mockedState).value;
            expect(iter).toEqual(put(teamActions.selectTeam({id: 1})));
        });

        it('should return from saga', function() {
            const iter = iterator.next().done;
            expect(iter).toEqual(true);
        });
    });

});

describe('HandleJoinTeam saga', () => {
    const url = api.urls.teamJoin();
    const errorMsg = 'Club doesn\'t exist or username already taken';
    const action = teamActions.requestJoinTeam({id: 17}, 'Dodo');

    describe('Scenario 1: Successful POST with join request', () => {
        const iterator = teamSagas.onTeamJoin(action);

        it('should call API with POST request to join team', () => {
            const iter = iterator.next().value;
            const expected = call(api.requests.post, url, action.data, errorMsg);
            expect(iter).toEqual(expected);
        });

        it('should show modal with a response message', () => {
            const response = 'OK';
            const iter = iterator.next(response).value;
            const expected = put(showQuestionModal({
                title: 'One second, please...',
                text: response,
                onAccept: () => {},
            }));
            expect(JSON.stringify(iter)).toEqual(JSON.stringify(expected));
        });

        it('should get current amount of pending requests', () => {
            const iter = iterator.next().value;
            const expected = select(getMyRequestsPending);
            expect(iter).toEqual(expected);
        });

        it('should update amount of pending requests', function() {
            const iter = iterator.next(5).value;
            const expected = put(teamActions.updateMyPending(6));
            expect(iter).toEqual(expected);
        });

        it('should return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });

    describe('Scenario 2: POST with join request failed', () => {
        const iterator = teamSagas.onTeamJoin(action);
        it('should call API with POST request to join team', () => {
            const iter = iterator.next(action).value;
            expect(iter).toEqual(call(api.requests.post, url, action.data, errorMsg));
        });

        it('should put RAISE_ERROR with error message', () => {
            const iter = iterator.throw(errorMsg).value;
            expect(iter).toEqual(put(raiseError(errorMsg)));
        });

        it('should not return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });
});

describe('FetchPendingMembers saga', () => {
    const errorMsg = 'Failed to fetch pending members';
    const stateWithTeamsAndSelected = {
        teams: {
            joined: [ {id: 3}, {id: 5} ],
            pending: 0,
            selected: 5
        },
    };

    describe('Scenario 1: Successful GET pending members', () => {
        const iterator = teamSagas.fetchPendingMembers();
        const url = api.urls.teamMemberList(stateWithTeamsAndSelected.teams.selected);

        it('should get current team', () => {
            const iter = iterator.next(stateWithTeamsAndSelected).value;
            expect(iter).toEqual(select(getSelectedTeam));
        });

        it('should call API with GET request to fetch not accepted members', () => {
            const iter = iterator.next(stateWithTeamsAndSelected.teams.joined[1]).value;
            expect(iter).toEqual(call(api.requests.get, url, { is_accepted: 'False'}, errorMsg));
        });

        it('should put SET_PENDING_MEMBERS with success message', () => {
            const response = {};
            const iter = iterator.next(response).value;
            expect(iter).toEqual(put(teamActions.setPendingMembers(response)));
        });

        it('should return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });

    describe('Scenario 2: Failed to get pending members list', () => {
        const iterator = teamSagas.fetchPendingMembers();
        const url = api.urls.teamMemberList(stateWithTeamsAndSelected.teams.selected);

        it('should get current team', () => {
            const iter = iterator.next(stateWithTeamsAndSelected).value;
            expect(iter).toEqual(select(getSelectedTeam));
        });

        it('should call API with GET request to fetch not accepted members', () => {
            const iter = iterator.next(stateWithTeamsAndSelected.teams.joined[1]).value;
            expect(iter).toEqual(call(api.requests.get, url, { is_accepted: 'False'}, errorMsg));
        });

        it('should put SET_PENDING_MEMBERS with success message', () => {
            const iter = iterator.throw(errorMsg).value;
            expect(iter).toEqual(put(raiseError(errorMsg)));
        });

        it('should return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });
});


describe('Team invite saga', function() {
    describe('Scenario 1: Handled invitation', function() {
        const email = 'a@b.co';
        const action = inviteUser(email);
        const iterator = teamSagas.onTeamInvite(action);
        const url = api.urls.teamInvite(5);
        const errorMsg = `Failed to send invitation to ${email}`;

        it('should get selected team', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(select(getSelectedTeam));
        });

        it('should send invitation request', function() {
            const iter = iterator.next({id: 5});
            expect(iter.value).toEqual(call(api.requests.post, url, {email}, errorMsg));
        });

        it('should show info', function() {
            const iter = iterator.next({message: 'DONE'});
            expect(iter.value).toEqual(put(showInfo('DONE')));
        });

        it('should return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });

    describe('Scenario 2: Handle on fail', function() {
        const email = 'a@b.co';
        const action = inviteUser(email);
        const iterator = teamSagas.onTeamInvite(action);
        const url = api.urls.teamInvite(5);
        const errorMsg = `Failed to send invitation to ${email}`;

        it('should get selected team', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(select(getSelectedTeam));
        });

        it('should send invitation request', function() {
            const iter = iterator.next({id: 5});
            expect(iter.value).toEqual(call(api.requests.post, url, {email}, errorMsg));
        });

        it('should show info', function() {
            const iter = iterator.throw('FAILED');
            expect(iter.value).toEqual(put(raiseError('FAILED')));
        });

        it('should return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });
});

describe('Email autocompletion', function() {
    describe('on short input', function() {
        const action = {input: 'ab'};
        const iterator = teamSagas.emailAutocompletion(action);

        it('should ignore short inputs', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(put(receivedEmailAutocompletion([])));
        });

        it('should return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });

    describe('on valid input', function() {
        const email = 'abc@def.gh';
        const action = {input: 'abc@'};
        const iterator = teamSagas.emailAutocompletion(action);
        const url = api.urls.playerList();
        const errorMsg = 'Cannot get email autocompletion';

        it('should call the API endpoint', function() {
            const iter = iterator.next();
            const expected = call(api.requests.get, url, {email_prefix: action.input}, errorMsg);
            expect(iter.value).toEqual(expected);
        });

        it('should store suggestions', function() {
            const iter = iterator.next([{email}]);
            expect(iter.value).toEqual(put(receivedEmailAutocompletion([{
                value: email,
                label: email,
            }])));
        });

        it('should return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });
});

describe('Team name autocompletion', function() {
    describe('on short input', function() {
        const action = {input: 'ab'};
        const iterator = teamSagas.nameAutocompletion(action);

        it('should ignore short inputs', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(put(teamActions.receivedAutocompletion([])));
        });

        it('should return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });

    describe('on valid input', function() {
        const name = 'abcdef';
        const action = {input: 'abcd'};
        const iterator = teamSagas.nameAutocompletion(action);
        const url = api.urls.teamList();
        const errorMsg = 'Cannot get clubs autocompletion';

        it('should call the API endpoint', function() {
            const iter = iterator.next();
            const expected = call(api.requests.get, url, {name_prefix: action.input}, errorMsg);
            expect(iter.value).toEqual(expected);
        });

        it('should store suggestions', function() {
            const iter = iterator.next([{name}]);
            expect(iter.value).toEqual(put(teamActions.receivedAutocompletion([{
                value: name,
                label: name,
            }])));
        });

        it('should return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });
});


describe('Routes sagas', function() {
    describe('Joined list route', function() {
        const iterator = teamSagas.teamList();

        it('should fetch teams', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(fork(teamSagas.fetchTeams));
        });

        it('should fetch events', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(fork(teamSagas.fetchEvents));
        });

        it('should respond to change default', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(takeLatest(teamActions.CHANGE_DEFAULT, teamSagas.onChangeDefault));
        });

        it('should respond to create team', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(takeLatest(teamActions.REQUEST_CREATE_TEAM, teamSagas.onTeamCreate));
        });

        it('should respond to join team', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(takeLatest(teamActions.REQUEST_JOIN_TEAM, teamSagas.onTeamJoin));
        });

        it('should respond to select team', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(takeLatest(teamActions.SELECT_TEAM, teamSagas.onTeamSelect));
        });

        it('should fetch autocompletion', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(throttle(500, teamActions.FETCH_AUTOCOMPLETION, teamSagas.nameAutocompletion));
        });

        it('should respond to leave team', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(takeEvery(teamActions.LEAVE_TEAM, teamSagas.onTeamLeave));
        });

        it('should end saga', function() {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });

    describe('Pending members route', function() {
        const iterator = teamSagas.teamPending();

        it('should fetch pending members', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(fork(teamSagas.fetchPendingMembers));
        });

        it('should respond to accept/reject member', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(takeLatest(teamActions.MEMBER_ACCEPTANCE, teamSagas.onMemberAccept));
        });

        it('should end saga', function() {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });

    describe('Team inviting route', function() {
        const iterator = teamSagas.teamInvite();

        it('should handle email autocompletion', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(throttle(500, FETCH_AUTOCOMPLETION, teamSagas.emailAutocompletion));
        });

        it('should respond to invite', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(takeLatest(INVITE, teamSagas.onTeamInvite));
        });

        it('should end saga', function() {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });

    describe('Team admin page route', function() {
        const iterator = teamSagas.teamAdmin();

        it('should fetch users', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(fork(fetchUsers));
        });

        it('should respond to manage user action', function() {
            const iter = iterator.next();
            expect(iter.value).toEqual(takeLatest(teamActions.MANAGE_USER, teamSagas.onManageUser));
        });

        it('should end saga', function() {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });
});
