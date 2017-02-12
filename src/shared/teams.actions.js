export const CREATE_TEAM = 'TEAMS::CREATE';

export const createTeam = (name) => ({
    type: CREATE_TEAM,
    name,
});
