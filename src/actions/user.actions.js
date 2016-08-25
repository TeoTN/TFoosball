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
        selected: !user.selected,
    }
}

export function choosePlayersForMatch() {
    return {
        type: 'CHOOSE_PLAYERS',
    };
}

export function sortByExp() {
    return {
        type: 'SORT_BY_EXP',
    }
}

export function sortByName() {
    return {
        type: 'SORT_BY_NAME',
    }
}
