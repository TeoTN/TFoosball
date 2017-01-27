import PromiseWindow from 'promise-window';
import serialize from '../utils/serialize';
import { AUTH_REDIR_URL, OAUTH_CLIENT_ID } from '../api/config';

export const prepareWindow = () => {
    const promptConfig = {
        width: 500,
        height: 600,
        windowName: 'TFoosball - Let me in with Google',
        onPostMessage(event) {
            if (event.data.error) {
                this._reject(event.data.error);
            } else {
                this._resolve(event.data);
            }
        },
    };
    const google_endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const auth_request_data = serialize({
        response_type: 'token',
        client_id: OAUTH_CLIENT_ID,
        redirect_uri: AUTH_REDIR_URL,
        scope: 'email',
    });
    const url = `${google_endpoint}?${auth_request_data}`;
    return new PromiseWindow(url, promptConfig);
};
