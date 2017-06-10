import { SHOW_QUESTION, SHOW_MODAL_INFO, ACCEPT, REJECT } from './modal.actions';

export default (state = {}, action) => {
    switch (action.type) {
        case SHOW_QUESTION:
        case SHOW_MODAL_INFO:
            return action.params;
        case ACCEPT:
        case REJECT:
            return {};
        default:
            return state;
    }
};
