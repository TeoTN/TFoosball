export const REQUEST_CREATE_TEAM = 'TEAMS::REQUEST_CREATE';
export const REQUEST_JOIN_TEAM = 'TEAMS::REQUEST_JOIN';
export const TEAM_CREATED = 'TEAMS::DONE_CREATE';
export const SET_TEAMS = 'TEAMS::SET_TEAMS';
export const SELECT_TEAM = 'TEAMS::SELECT';
export const PENDING_MEMBERS = 'TEAMS::PENDING_MEMBERS';
export const MEMBER_ACCEPTANCE = 'TEAMS::MEMBER_ACCEPTANCE';
export const LEAVE_TEAM = 'TEAMS::LEAVE';
export const TEAM_LEFT = 'TEAMS::LEFT';
export const MANAGE_USER = 'TEAMS::MANAGE_USER';
export const CHANGE_DEFAULT = 'TEAMS::CHANGE_DEFAULT';
export const FETCH_AUTOCOMPLETION = 'TEAMS::FETCH_AUTOCOMPLETION';
export const RECEIVED_AUTOCOMPLETION = 'TEAMS::RECEIVED_AUTOCOMPLETION';


export const requestCreateTeam = (name, username) => ({
    type: REQUEST_CREATE_TEAM,
    name,
    username,
});

export const changeDefault = (id) => ({
    type: CHANGE_DEFAULT,
    id,
});

export const teamCreated = (team) => ({
    type: TEAM_CREATED,
    team
});

export const setTeams = ({ teams, pending }) => ({
    type: SET_TEAMS,
    teams,
    my_pending: pending
});

export const selectTeam = (team) => ({
    type: SELECT_TEAM,
    team
});

export const leaveTeam = (team) => ({
    type: LEAVE_TEAM,
    team
});

export const teamLeft = (team) => ({
    type: TEAM_LEFT,
    team
});

export const requestJoinTeam = (team, username) => ({
    type: REQUEST_JOIN_TEAM,
    data: {
        team,
        username,
    },
});

export const setPendingMembers = (response) => ({
    type: PENDING_MEMBERS,
    list: response,
});

export const memberAcceptance = (id, shouldAccept) => ({
    type: MEMBER_ACCEPTANCE,
    id,
    shouldAccept,
});

export const manageUser = (updatedProfile) => ({
    type: MANAGE_USER,
    updatedProfile,
});

export const fetchAutocompletion = (input) => ({
    type: FETCH_AUTOCOMPLETION,
    input,
});

export const receivedAutocompletion = (response) => ({
    type: RECEIVED_AUTOCOMPLETION,
    teamNames: response
});
