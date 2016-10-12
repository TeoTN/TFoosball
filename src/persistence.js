const loadData = (key) => () => {
    try {
        const serializedData = localStorage.getItem(key);
        if (serializedData === null) {
            return undefined;
        }
        return JSON.parse(serializedData);
    }
    catch (err) {
        return undefined;
    }
};

const saveData = (key) => (data) => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
    }
    catch(err) {
        console.error(err);
    }
};

export const loadAuthState = loadData('auth');
export const saveAuthState = saveData('auth');