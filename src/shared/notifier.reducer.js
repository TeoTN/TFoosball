import { SHOW_INFO, RAISE_ERROR, HANDLE } from './notifier.actions';

let lastNotifId = 0;
export default (state = [], {type, id, msg, style}) => {
    switch (type) {
        case SHOW_INFO:
        case RAISE_ERROR:
            return [{ id: lastNotifId++, msg, style }, ...state];
        case HANDLE:
            return state.filter(notif => notif.id !== id );
        default:
            return state;
    }
}
