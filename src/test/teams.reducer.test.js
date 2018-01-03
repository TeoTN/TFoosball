import * as actions from '../teams/teams.actions';
import { signedOut } from '../shared/auth/auth.actions';
import { profileUpdate } from '../profile/profile.actions';
import { teams, getSelectedTeam } from '../teams/teams.reducer';
import deepFreeze from 'deep-freeze';

describe('Teams teams', () => {
    it('should add created team to joined list', () => {
        const team = { id: 1, name: 'Team1', };
        const stateBefore = {
            selected: 0,
            pending: [],
            joined: [],
        };
        const action = actions.teamCreated(team);
        const stateAfter = {
            selected: 0,
            pending: [],
            joined: [ team ],
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(stateAfter);
    });

    it('should select team', () => {
        const team = { id: 1, name: 'Team1', };
        const stateBefore = {
            selected: 0,
            pending: [],
            joined: [],
        };
        const action = actions.selectTeam(team);
        const stateAfter = {
            selected: 1,
            pending: [],
            joined: [],
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(stateAfter);
    });

    it('should set teams', () => {
        const teamList = [{ id: 1, name: 'Team1', }, { id: 2, name: 'Team2', }];
        const stateBefore = {
            selected: 0,
            pending: [],
            my_pending: 0,
            joined: [],
        };
        const action = actions.setTeams({teams: teamList,});
        const stateAfter = {
            selected: 0,
            pending: [],
            my_pending: 0,
            joined: teamList,
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(stateAfter);
    });

    it('should clean on signed out', () => {
        const teamList = [{ id: 1, name: 'Team1', }, { id: 2, name: 'Team2', }];
        const stateBefore = {
            selected: 5,
            pending: [teamList],
            joined: [teamList],
        };
        const action = signedOut();
        const stateAfter = {
            selected: 0,
            pending: [],
            joined: [],
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(stateAfter);
    });

    it('should update pending list', () => {
        const teamList = [{ id: 1, name: 'Team1', }, { id: 2, name: 'Team2', }];
        const stateBefore = {
            selected: 0,
            pending: [],
            joined: [],
        };
        const action = actions.setPendingMembers(teamList);
        const stateAfter = {
            selected: 0,
            pending: teamList,
            joined: [],
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(stateAfter);
    });

    it('should not change state on default', () => {
        const teamList = [{ id: 1, name: 'Team1', }, { id: 2, name: 'Team2', }];
        const stateBefore = {
            selected: 0,
            pending: teamList,
            joined: teamList,
        };
        const action = { type: 'NULL::DEFAULT '};

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(stateBefore);
    });

    it('should update profile', () => {
        const stateBefore = {
            selected: 1,
            pending: [],
            joined: [{ id: 1, name: 'Team1', username: 'Wacko'},],
        };
        const action = profileUpdate({ username: 'UName'});
        const stateAfter = {
            selected: 1,
            pending: [],
            joined: [{ id: 1, name: 'Team1', username: 'UName'},],
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(stateAfter);
    });

    it('should not update profile', () => {
        const stateBefore = {
            selected: 1,
            pending: [],
            joined: [{ id: 1, name: 'Team1', username: 'Wacko'},],
        };
        const action = profileUpdate({ prop: 'unk'});
        const stateAfter = {
            selected: 1,
            pending: [],
            joined: [{ id: 1, name: 'Team1', username: 'Wacko'},],
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(teams(stateBefore, action)).toEqual(stateAfter);
    });
});

describe('getSelectedTeam', () => {
    it('should get selected team', () => {
        const state = {
            teams: {
                selected: 2,
                pending: [],
                joined: [{id: 1, name: 'Team1',}, {id: 2, name: 'Team2',}],
            }
        };
        expect(getSelectedTeam(state)).toEqual({ id: 2, name: 'Team2', });
    });
});
