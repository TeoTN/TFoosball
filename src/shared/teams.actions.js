export const CREATE_TEAM = 'TEAMS::CREATE';

export const createTeam = (name, username) => ({
    type: CREATE_TEAM,
    name,
    username,
});
