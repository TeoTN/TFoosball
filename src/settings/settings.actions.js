export const REQUEST_SAVE_PROFILE = 'SETTINGS::SAVE_PROFILE';
export const REQUEST_SAVE_MEMBER = 'SETTINGS::SAVE_MEMBER';

export const requestSaveProfile = (partialData) => ({
    type: REQUEST_SAVE_PROFILE,
    partialData,
});

export const requestSaveMember = (partialData) => ({
    type: REQUEST_SAVE_MEMBER,
    partialData,
});
