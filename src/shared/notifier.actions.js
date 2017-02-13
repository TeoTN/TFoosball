export const SHOW_INFO = 'NOTIFIER::SHOW_INFO';
export const RAISE_ERROR = 'NOTIFIER::RAISE_ERROR';
export const HANDLE = 'NOTIFIER::HANDLE';
export const CLEAN = 'NOTIFIER::CLEAN';

export const showInfo = (msg) => ({
    type: SHOW_INFO,
    style: 'info',
    msg
});

export const raiseError = (msg) => ({
    type: RAISE_ERROR,
    style: 'danger',
    msg
});

export const handleMsg = (id) => ({
    type: HANDLE,
    id,
});

export const clean = () => ({
    type: CLEAN,
});
