export const SHOW_QUESTION = 'MODAL::SHOW_QUESTION';
export const REJECT = 'MODAL::REJECT';
export const ACCEPT = 'MODAL::ACCEPT';

export const showQuestionModal = (params) => ({
    type: SHOW_QUESTION,
    params
});

export const rejectModal = () => ({
    type: REJECT,
});

export const acceptModal = () => ({
    type: ACCEPT,
});
