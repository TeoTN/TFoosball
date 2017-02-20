const loadData = (key) => () => {
    try {
        const serializedData = localStorage.getItem(key);
        if (serializedData === null) {
            return undefined;
        }
        return JSON.parse(serializedData);
    } catch (err) {
        return undefined;
    }
};

const saveData = (key) => (data) => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
    } catch (err) {
        console.error(err);
    }
};

const removeData = (key) => () => {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error(err);
    }
};

export const loadState = loadData('state');
export const saveState = saveData('state');
export const removeState = removeData('state');
