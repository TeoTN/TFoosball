export function userDelete(id) {
    return {
        type: 'DELETE_USER',
        id
    };
}

export function userIncreaseExp(user) {
    return {
        type: 'UPDATE_USER',
        id: user.id,
        exp: user.exp + 10,
    };
}

export function userDecreaseExp(user) {
    return {
        type: 'UPDATE_USER',
        id: user.id,
        exp: user.exp - 10,
    };
}

let lastUserId = 0;
export function userNew(username) {
    return {
        type: 'ADD_USER',
        id: lastUserId++,
        username,
        exp: 1000,
    };
}

export function userToggle(user) {
    return {
        type: 'UPDATE_USER',
        id: user.id,
        userData: {
            selected: !user.selected,
        }
    };
}

export function choosePlayersForMatch() {
    return {
        type: 'CHOOSE_PLAYERS',
    };
}

export function sortByExp() {
    return {
        type: 'USER::SORT::EXP',
    };
}

export function sortByName() {
    return {
        type: 'USER::SORT::NAME',
    };
}
