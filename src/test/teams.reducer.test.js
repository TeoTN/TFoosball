import * as actions from '../teams/teams.actions';
import { signedOut } from '../shared/auth/auth.actions';
import { profileUpdate } from '../profile/profile.actions';
import { teams, getSelectedTeam } from '../teams/teams.reducer';
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

describe('getSelectedTeam', () => {
    it('should get selected team', () => {
        const state = {
            teams: {
                meta: {
                    selected: 2,
                    pending: [],
                },
                joined: [{id: 1, name: 'Team1',}, {id: 2, name: 'Team2',}],
            }
        };
        expect(getSelectedTeam(state)).toEqual({ id: 2, name: 'Team2', });
    });
});
