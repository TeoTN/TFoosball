import { call, put, take, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import {
    createTeam,
    fetchTeams,
    initTeam,
    handleJoinTeam,
    fetchPendingMembers,
    onTeamCreate,
    onTeamSelect
} from '../teams/teams.sagas';
import { authenticate, fetchProfile } from '../shared/auth/auth.sagas';
import api from '../api';
import { showInfo, raiseError } from '../shared/notifier.actions';
import {
    REQUEST_JOIN_TEAM,
    SELECT_TEAM,
    teamCreated,
    setTeams,
    selectTeam,
    setPendingMembers,
    requestJoinTeam,
    requestCreateTeam
} from '../teams/teams.actions.js';
import { showQuestionModal } from '../shared/modal.actions';
import { getSelectedTeam, getTeamsState } from "../teams/teams.reducer";
import { getToken } from "../shared/auth/auth.reducer";


describe('TeamCreationFlow saga', () => {
    describe('Scenario 1: Typical [Success]', () => {
        const action = requestCreateTeam('Team', 'Username');
        const iterator = onTeamCreate(action);
        const team = { id: 1, name: 'Team', member_id: 7 };

        it('should attempt authenticating user', () => {
            const iter = iterator.next().value;
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
});

describe('CreateTeam saga - success scenario', () => {
    const team = {
        name: 'Team 0',
        username: 'Zbyszek',
    };
    const url = api.urls.teamList();

    describe('Scenario 1: Typical [Success]', () => {
        const iterator = createTeam(team);

        it('should call api: POST request', () => {
            const iter = iterator.next(team).value;
            expect(iter).toEqual(call(api.requests.post, url, team, 'Club already exists'));
        });

        it('should put TEAM_CREATED', () => {
            const iter = iterator.next(team).value;
            expect(iter).toEqual(put(teamCreated(team)))
        });

        it('should put SHOW_INFO about created team', () => {
            const iter = iterator.next(team).value;
            expect(iter).toEqual(put(showInfo(`Club ${team.name} successfully created.`)));
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

    describe('Scenario 2: Failed to POST a new team', () => {
        const iterator = createTeam(team);
        const errorMsg = 'Club already exists';
        it('should call api: POST request', () => {
            const iter = iterator.next(team).value;
            expect(iter).toEqual(call(api.requests.post, url, team, errorMsg));
        });

        it('should put RAISE_ERROR with error message', () => {
            const iter = iterator.throw(errorMsg).value;
            expect(iter).toEqual(put(raiseError(errorMsg)));
        });

        it('should return from the saga with empty object', () => {
            const iter = iterator.next();
            expect(iter.done).toEqual(true);
            expect(iter.value).toEqual({});
        });
    });
});

describe('HandleSelectTeam saga', () => {
    const team = {
        id: 7,
        member_id: 15,
        username: 'Axis'
    };
    const action = selectTeam(team);
    const iterator = onTeamSelect(action);

    xit('should wait to take SELECT_TEAM', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(take(SELECT_TEAM));
    });

    it('should fetch profile', () => {
        const iter = iterator.next(selectTeam(team)).value;
        expect(iter).toEqual(call(fetchProfile, team.id, team.member_id));
    });

    it('should redirect to new profile teams', () => {
        const iter = iterator.next().value;
        expect(iter).toEqual(call([browserHistory, browserHistory.push], `/clubs/joined`));
    });

    xit('should not return from saga', () => {
        const iter = iterator.next();
        expect(iter.done).toEqual(false);
        expect(iter.value).toEqual(take(SELECT_TEAM));
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
        const iterator = fetchTeams();

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
            expect(iter).toEqual(put(setTeams(responseMock)))
        });

        it('should return from the saga', () => {
            expect(iterator.next().done).toBe(true);
        });
    });

    describe('Scenario 2: Unauthenticated', () => {
        const iterator = fetchTeams();

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
        const iterator = fetchTeams();

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

describe('InitTeam saga', () => {
    const stateWithTeamsAndSelected = {
        teams: {
            joined: [ {id: 3}, {id: 5} ],
            pending: 0,
            selected: 5
        },
    };
    const stateWithTeams = {
        teams: {
            joined: [ {id: 3}, {id: 5} ],
            pending: 0,
        }
    };

    const stateWithoutTeams = {
        teams: {
            joined: [],
            pending: 1,
        }
    };

    describe('Scenario 1: Success - team selected', () => {
        const iterator = initTeam();
        it('should get teams from store', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(getTeamsState));
        });

        it('should get selected team', () => {
            const iter = iterator.next(stateWithTeamsAndSelected.teams).value;
            expect(iter).toEqual(select(getSelectedTeam));
        });

        it('should put SELECT_TEAM with the team', () => {
            const iter = iterator.next({id: stateWithTeamsAndSelected.teams.selected}).value;
            expect(iter).toEqual(put(selectTeam(stateWithTeamsAndSelected.teams.joined[1])))
        });

        it('should return from the saga with the team selected', () => {
            const iter = iterator.next();
            expect(iter.value).toEqual(stateWithTeamsAndSelected.teams.joined[1]);
            expect(iter.done).toBe(true);
        });
    });

    describe('Scenario 2: No teams were joined', () => {
        const iterator = initTeam();
        it('should get teams from store', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(getTeamsState));
        });

        it('should get selected team', () => {
            const iter = iterator.next(stateWithoutTeams.teams).value;
            expect(iter).toEqual(select(getSelectedTeam));
        });

        it('should redirect to /welcome page', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(call([browserHistory, browserHistory.push], '/welcome'));
        });

        it('should return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });

    describe('Scenario 3: No team was selected previously', () => {
        const iterator = initTeam();

        it('should get teams from store', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(select(getTeamsState));
        });

        it('should get selected team', () => {
            const iter = iterator.next(stateWithTeams.teams).value;
            expect(iter).toEqual(select(getSelectedTeam));
        });

        it('should put SELECT_TEAM with the team', () => {
            const iter = iterator.next({id: stateWithTeams.teams.joined[0].id}).value;
            expect(iter).toEqual(put(selectTeam(stateWithTeams.teams.joined[0])))
        });

        it('should return from the saga with the team selected', () => {
            const iter = iterator.next();
            expect(iter.value).toEqual(stateWithTeams.teams.joined[0]);
            expect(iter.done).toBe(true);
        });
    })
});

describe('HandleJoinTeam saga', () => {
    const url = api.urls.teamJoin();
    const errorMsg = 'Club doesn\'t exist or username already taken';
    const action = requestJoinTeam({id: 17}, 'Dodo');

    describe('Scenario 1: Successful POST with join request', () => {
        const iterator = handleJoinTeam();
        it('should wait for REQUEST_JOIN_TEAM', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(take(REQUEST_JOIN_TEAM));
        });

        it('should call API with POST request to join team', () => {
            const iter = iterator.next(action).value;
            expect(iter).toEqual(call(api.requests.post, url, action.data, errorMsg));
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

        it('should not return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(false);
        });
    });

    describe('Scenario 2: POST with join request failed', () => {
        const iterator = handleJoinTeam();
        it('should wait for REQUEST_JOIN_TEAM', () => {
            const iter = iterator.next().value;
            expect(iter).toEqual(take(REQUEST_JOIN_TEAM));
        });

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
            expect(iter.done).toBe(false);
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
        const iterator = fetchPendingMembers();
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
            expect(iter).toEqual(put(setPendingMembers(response)));
        });

        it('should return from the saga', () => {
            const iter = iterator.next();
            expect(iter.done).toBe(true);
        });
    });

    describe('Scenario 2: Failed to get pending members list', () => {
        const iterator = fetchPendingMembers();
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

//
// it('should ', () => {
//     const iter = iterator.next().value;
//     expect(iter).toEqual()
// })
