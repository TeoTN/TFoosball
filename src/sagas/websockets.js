import { take, put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { raiseError } from '../actions/error.actions';

function users() {
    return eventChannel(emit => {
        const ws = new WebSocket('ws://localhost:8000/ws/users?subscribe-broadcast&publish-broadcast');
        ws.onopen = () => {
            emit({ type: 'WS::OPENED' });
        };

        ws.onerror = () => {
            emit(raiseError('WebSocket connection failed. Please consider refreshing the page.'));
        };

        ws.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);
                emit(msg);
            } catch (error) {
                emit(raiseError('Failed to process message from Server/WS. Please consider refreshing the page.'));
                console.error(error, event);
            }
        };

        return () => {
            emit({ type: 'WS::CLOSED' });
            ws.close();
        }
    })
}

export function* websockets() {
    const channel = yield call(users);
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}
