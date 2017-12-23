import { normalize } from 'normalizr';
import { userListSchema } from "./users.schema";
import getRoles from '../utils/roles';


export const ADD = 'USERS::ADD';
export const FETCH_ENTITIES = 'USERS::FETCH::ENTITIES';
export const ERROR_FETCHING_ENTITIES = 'USERS::FETCH::ENTITIES_ERROR';
export const UPDATE = 'USERS::UPDATE::ENTITY';
export const DELETE = 'USERS::DELETE';
export const CHOOSE = 'USERS::CHOOSE';
export const TOGGLE = 'USERS::TOGGLE';
export const RECEIVE_LIST = 'USERS::RECEIVE::LIST';
export const SORT = 'USERS::SORT';
export const UPDATE_LIST = 'USERS::UPDATE::LIST';
export const SWAP_SIDES = 'USERS::SWAP::SIDES';
export const SWAP_POSITIONS = 'USERS::SWAP::POSITIONS';
export const ASSIGN = 'USERS::ASSIGN';
export const FETCH_AUTOCOMPLETION = 'USERS::FETCH_AUTOCOMPLETION';
export const RECEIVED_AUTOCOMPLETION = 'USERS::RECEIVED_AUTOCOMPLETION';
export const INVITE = 'USERS::INVITE';

export const inviteUser = (email) => ({
    type: INVITE,
    email,
});

export const fetchEmailAutocompletion = (input) => ({
    type: FETCH_AUTOCOMPLETION,
    input,
});

export const receivedEmailAutocompletion = (emails) => ({
    type: RECEIVED_AUTOCOMPLETION,
    emails,
});

export const userToggle = (user) => ({
    type: TOGGLE,
    id: user.id,
});

export const userUpdate = (id, userData) => ({
    type: UPDATE,
    id,
    userData,
});

export const userAssign = (user, team, position) => ({
    type: ASSIGN,
    payload: {
        user,
        team,
        position,
    }
});

export const choosePlayersForMatch = (selectedUsers) => {
    const preset = getRoles(selectedUsers);
    const {red_att, red_def, blue_att, blue_def} = preset;
    return {
        type: CHOOSE,
        payload: {
            playing: Object.values(preset),
            red: [red_att, red_def],
            blue: [blue_att, blue_def],
            att: [red_att, blue_att],
            def: [red_def, blue_def],
        }
    }
};

export const sortBy = (column, isAscendingOrder = true) => ({
    type: SORT,
    payload: {
        column,
        isAscendingOrder,
    },
});

export const receiveUsers = (response) => ({
    type: RECEIVE_LIST,
    entities: normalize(response, userListSchema).entities.users,
});

export const updateUsers = (response) => ({
    type: UPDATE_LIST,
    entities: normalize(response, userListSchema).entities.users,
});

export const swapSides = () => ({type: SWAP_SIDES,});
export const swapPositions = () => ({type: SWAP_POSITIONS,});
export const fetchEntities = () => ({type: FETCH_ENTITIES});
export const errorFetchingEntities = () => ({type: ERROR_FETCHING_ENTITIES});
