import * as actions from './teams.actions';
import { signedOut } from '../shared/auth/auth.actions';
import { profileUpdate } from '../profile/profile.actions';
import {
    teams, getSelectedTeam, getTeamsState, getJoinedTeams, getTeamsMetadata,
    getEventsState, getMyRequestsPending, getAutocompletionState, getSelectedTeamId, getDefaultTeamId, getTeamPending,
    getTeamBasics
} from './teams.reducer';
import deepFreeze from 'deep-freeze';

describe('Teams teams', () => {
    it('should add created team to joined list', () => {
        const team = { id: 1, name: 'Team1', };
        const stateBefore = {
            joined: [],
        };
        const action = actions.teamCreated(team);
        const stateAfter = {
            joined: [ team ],
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(jasmine.objectContaining(stateAfter));
    });

    it('should select team', () => {
        const team = { id: 1, name: 'Team1', };
        const stateBefore = {
            meta: {
                selected: 0,
            }
        };
        const action = actions.selectTeam(team);
        const stateAfter = {
            meta: {
                selected: 1,
            }
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(jasmine.objectContaining(stateAfter));
    });

    it('should set teams', () => {
        const teamList = [{ id: 1, name: 'Team1', }, { id: 2, name: 'Team2', }];
        const stateBefore = {
            joined: [],
        };
        const action = actions.setTeams({teams: teamList,});
        const stateAfter = {
            joined: teamList,
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(jasmine.objectContaining(stateAfter));
    });

    it('should update pending list', () => {
        const teamList = [{ id: 1, name: 'Team1', }, { id: 2, name: 'Team2', }];
        const stateBefore = {
            meta: {
                pending: [],
            }
        };
        const action = actions.setPendingMembers(teamList);
        const stateAfter = {
            meta: {
                pending: teamList,
            }
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(jasmine.objectContaining(stateAfter));
    });

    it('should not change state on default', () => {
        const teamList = [{ id: 1, name: 'Team1', }, { id: 2, name: 'Team2', }];
        const stateBefore = teams();
        const action = { type: 'NULL::DEFAULT '};

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(stateBefore);
    });

    it('should update profile', () => {
        const stateBefore = {
            joined: [{ id: 1, name: 'Team1', username: 'Wacko'},],
        };
        const action = profileUpdate({ username: 'UName'}, 1);
        const stateAfter = {
            joined: [{ id: 1, name: 'Team1', username: 'UName'},],
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(jasmine.objectContaining(stateAfter));
    });

    it('should not update profile', () => {
        const stateBefore = {
            joined: [{ id: 1, name: 'Team1', username: 'Wacko'},],
        };
        const action = profileUpdate({ prop: 'unk'}, 0);
        const stateAfter = {
            joined: [{ id: 1, name: 'Team1', username: 'Wacko'},],
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(jasmine.objectContaining(stateAfter));
    });
});

describe('Selectors', () => {
    const defaultState = teams();
    const wrap = teams => ({teams});
    it('should get teams state', function() {
        const state = {
            teams: defaultState,
            users: {},
            auth: {}
        };
        expect(getTeamsState(state)).toEqual(defaultState);
    });

    it('should get joined state', function() {
        const state = Object.assign({}, defaultState, {joined: [{id: 1}]});
        expect(getJoinedTeams(wrap(state))).toEqual([{id: 1}]);
    });

    it('should get teams metadata', function() {
        const meta = {
            selected: 1,
            myPending: 10,
            defaultTeam: 5,
        };
        const state = Object.assign({}, defaultState, { meta });
        expect(getTeamsMetadata(wrap(state))).toEqual(meta);
    });

    it('should get my pending requests', function() {
        const meta = {
            selected: 1,
            myPending: 10,
            defaultTeam: 5,
        };
        const state = Object.assign({}, defaultState, { meta });
        expect(getMyRequestsPending(wrap(state))).toEqual(10);
    });

    it('should get selected team id', function() {
        const meta = {
            selected: 1,
            myPending: 10,
            defaultTeam: 5,
        };
        const state = Object.assign({}, defaultState, { meta });
        expect(getSelectedTeamId(wrap(state))).toEqual(1);
    });

    it('should get default team id', function() {
        const meta = {
            selected: {id: 1},
            myPending: 10,
            defaultTeam: 5,
        };
        const state = Object.assign({}, defaultState, { meta });
        expect(getDefaultTeamId(wrap(state))).toEqual(5);
    });

    it('should get pending members', function() {
        const meta = {
            selected: {id: 1},
            myPending: 10,
            defaultTeam: 5,
            pending: [{id: 15}]
        };
        const state = Object.assign({}, defaultState, { meta });
        expect(getTeamPending(wrap(state))).toEqual([{id: 15}]);
    });

    it('should get selected team', function() {
        const joined = [
            {id: 1, x: 'o'},
            {id: 5},
            {id: 10},
        ];
        const meta = {
            selected: 1,
            myPending: 10,
            defaultTeam: 5,
        };
        const state = Object.assign({}, defaultState, { meta, joined });
        expect(getSelectedTeam(wrap(state))).toEqual({id: 1, x: 'o'});
    });

    it('should get events', function() {
        const events = {
            list: [{id: 5}],
            loading: false,
            error: null,
        };
        const state = Object.assign({}, defaultState, {events});
        expect(getEventsState(wrap(state))).toEqual(events);
    });

    it('should get autocompletion state', function() {
        const autocompletion = {
            loading: true,
            teamNames: ['a', 'bb', 'ccc'],
        };
        const state = Object.assign({}, defaultState, {autocompletion});
        expect(getAutocompletionState(wrap(state))).toEqual(autocompletion);
    });

    it('should get team basics', function() {
        const joined = [{id: 1}, {id: 2}, {id: 3}];
        const meta = {
            defaultTeam: 2,
            selected: 3,
        };
        const state = Object.assign({}, defaultState, {meta, joined});
        expect(getTeamBasics(wrap(state))).toEqual({
            joinedTeams: joined,
            defaultTeamId: 2,
            selectedTeam: {id: 3},
        });
    });

});
