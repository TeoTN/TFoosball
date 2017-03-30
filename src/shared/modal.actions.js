export const SHOW_QUESTION = 'MODAL::SHOW_QUESTION';
export const SHOW_MODAL_INFO = 'MODAL::SHOW_INFO';
export const REJECT = 'MODAL::REJECT';
export const ACCEPT = 'MODAL::ACCEPT';

export const showQuestionModal = (params) => ({
    type: SHOW_QUESTION,
    params,
});

export const showModalInfo = (params) => ({
    type: SHOW_MODAL_INFO,
    params,
});

export const rejectModal = () => ({
    type: REJECT,
});

export const acceptModal = () => ({
    type: ACCEPT,
});
