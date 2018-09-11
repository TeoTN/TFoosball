import { SHOW_INFO, RAISE_ERROR, HANDLE, CLEAN } from './notifier.actions';
import { SIGNED_OUT } from "../auth/auth.types";

let lastNotifId = 0;
export default (state = [], {type, id, msg, style}) => {
    switch (type) {
        case SHOW_INFO:
        case RAISE_ERROR:
            return [{ id: lastNotifId++, msg, style }, ...state.filter(n => n.msg !== msg)];
        case HANDLE:
            return state.filter(notif => notif.id !== id );
        case CLEAN:
        case SIGNED_OUT:
            return [];
        default:
            return state;
    }
}
