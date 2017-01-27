import { SHOW_QUESTION, ACCEPT, REJECT } from '../actions/modal.actions';

export default (state = {}, action) => {
    switch (action.type) {
        case SHOW_QUESTION:
            return action.params;
        case ACCEPT:
        case REJECT:
            return {};
        default:
            return state;
    }
};
