export const REQUEST_SAVE_SETTINGS = 'SETTINGS::REQUEST_SAVE';
export const SETTINGS_SAVED = 'SETTINGS::SAVED';
export const REQUEST_TOGGLE_ACTIVE = 'SETTINGS::REQUEST_TOGGLE_ACTIVE';


export const requestSaveSettings = (initialValues, values) => {
    const changedValues = Object.entries(values).reduce(
        (acc, [name, value]) => initialValues[name] !== values[name] ?
            Object.assign(acc, {[name]: value}) :
            acc,
        {}
    );
    return {
        type: REQUEST_SAVE_SETTINGS,
        values: changedValues,
    }
};

export const requestToggleActive = (value) => ({
    type: REQUEST_TOGGLE_ACTIVE,
    value,
});

export const settingsSaved = (values) => ({type: SETTINGS_SAVED, values});
