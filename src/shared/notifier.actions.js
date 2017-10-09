import { APIUnauthorizedError } from '../errors';
export const SHOW_INFO = 'NOTIFIER::SHOW_INFO';
export const RAISE_ERROR = 'NOTIFIER::RAISE_ERROR';
export const RAISE_UNAUTHORIZED = 'NOTIFIER::RAISE_UNAUTHORIZED';
export const HANDLE = 'NOTIFIER::HANDLE';
export const CLEAN = 'NOTIFIER::CLEAN';

export const showInfo = (msg) => ({
    type: SHOW_INFO,
    style: 'info',
    msg
});

export const raiseError = (error) => {
    // TODO pass action that caused the failure
    if (error.constructor === APIUnauthorizedError) {
        return { type: RAISE_UNAUTHORIZED };
    }
    return {
        type: RAISE_ERROR,
        style: 'danger',
        msg: error.toString(),
    };
};

export const handleMsg = (id) => ({
    type: HANDLE,
    id,
});

export const clean = () => ({
    type: CLEAN,
});
