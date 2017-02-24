export const REQUEST_CREATE_TEAM = 'TEAMS::REQUEST_CREATE';
export const REQUEST_JOIN_TEAM = 'TEAMS::REQUEST_JOIN';
export const TEAM_CREATED = 'TEAMS::DONE_CREATE';
export const SET_TEAMS = 'TEAMS::SET_TEAMS';
export const SELECT_TEAM = 'TEAMS::SELECT';

export const requestCreateTeam = (name, username) => ({
    type: REQUEST_CREATE_TEAM,
    name,
    username,
});

export const teamCreated = (team) => ({
    type: TEAM_CREATED,
    team
});

export const setTeams = ({ teams, pending }) => ({
    type: SET_TEAMS,
    teams,
    pending
});

export const selectTeam = (team) => ({
    type: SELECT_TEAM,
    team
});

export const requestJoinTeam = (team, username) => ({
    type: REQUEST_JOIN_TEAM,
    data: {
        team,
        username,
    },
});
