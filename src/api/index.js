import { API_ROOT, API_SERVER } from './config';
import { loadState } from '../persistence';
import { ensureJSON, ensureSuccessOr } from './helpers';
import { APIError } from "../errors";

const getDefaultHeaders = () => {
    const persistedState = loadState();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (persistedState && persistedState.hasOwnProperty('auth')) {
        headers.append('Authorization', `Bearer ${persistedState.auth.token}`);
    }
    return headers;
};

const getAuthHeaders = () => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
};

const bodyToParams = (body) => {
    const searchParams = new URLSearchParams();
    Object.entries(body).forEach(([key, value]) => searchParams.append(key, value));
    return searchParams;
};

const api = {
    requests: {
        get(url, params, errorMsg='Failed to retrieve data from server') {
            let target = url;
            if (params && Object.keys(params).length > 0) {
                const queryParams = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
                target = `${url}?${queryParams}`;
            }
            const request = new Request(target, {
                method: 'GET',
                headers: getDefaultHeaders(),
            });
            return fetch(request)
                .then(ensureSuccessOr(errorMsg))
                .then(ensureJSON);
        },
        post(url, body, errorMsg='Failed to send data to server') {
            const request = new Request(url, {
                method: 'POST',
                headers: getDefaultHeaders(),
                body: JSON.stringify(body),
            });
            return fetch(request)
                .then(ensureSuccessOr(errorMsg))
                .then(ensureJSON);
        },
        patch(url, body, errorMsg='Failed to send data to server') {
            const request = new Request(url, {
                method: 'PATCH',
                headers: getDefaultHeaders(),
                body: JSON.stringify(body),
            });
            return fetch(request)
                .then(ensureSuccessOr(errorMsg))
                .then(ensureJSON);
        },
        ['delete'](url, errorMsg='Failed to delete data on server') {  // eslint-disable-line no-useless-computed-key
            const request = new Request(url, {
                method: 'DELETE',
                headers: getDefaultHeaders(),
            });
            return fetch(request)
                .then(ensureSuccessOr(errorMsg));
        },
        obtainToken(url, body, errorMsg='Failed to authenticate') {
            const request = new Request(url, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: bodyToParams(body),
            });
            return fetch(request)
                .then(ensureSuccessOr(errorMsg))
                .then(ensureJSON)
        }
    },
    urls: { // TODO Proxy that adds API_ROOT
        root: () => API_ROOT,
        playerList: () => `${API_ROOT}/players/`,
        playerEntity: (player_id) => {
            if (player_id === undefined) {
                throw new APIError('Failed to identify player. Please log in again.');
            }
            return `${API_ROOT}/players/${player_id}/`;
        },
        playerEntityInvite: (player_id) => `${API_ROOT}/players/${player_id}/invite/`,
        teamList: () => `${API_ROOT}/teams/`,
        teamListJoined: () => `${API_ROOT}/teams/joined/`,
        teamJoin: () => `${API_ROOT}/teams/join/`,
        teamEntity: (team_id) => `${API_ROOT}/teams/${team_id}/`,
        teamAccept: () => `${API_ROOT}/teams/accept/`,
        teamInvite: (team_id) => `${API_ROOT}/teams/${team_id}/invite/`,
        teamEvents: (team_id) => `${API_ROOT}/teams/${team_id}/events/`,
        teamMemberList: (team_id) => {
            if (team_id === undefined) {
                throw new APIError('Failed to identify selected club. Please log in again');
            }
            return `${API_ROOT}/teams/${team_id}/members/`;
        },
        teamMemberEntity: (team_id, member_id) => {
            if (team_id === undefined || member_id === undefined) {
                throw new APIError('Failed to identify selected club. Please log in again');
            }
            return `${API_ROOT}/teams/${team_id}/members/${member_id}/`
        },
        teamMatchList: (team_id) => `${API_ROOT}/teams/${team_id}/matches/`,
        teamMatchEntity: (team_id, match_id) => `${API_ROOT}/teams/${team_id}/matches/${match_id}/`,
        teamMatchPoints: (team_id) => `${API_ROOT}/teams/${team_id}/matches/points/`,
        whatsNew: (version) => `${API_ROOT}/whatsnew/${version}/`,
        profile: () => `${API_ROOT}/rest-auth/user/`,
        logout: () => `${API_SERVER}auth/revoke-token/`,
        convertToken: () => `${API_SERVER}auth/convert-token/`,
        refreshToken: () => `${API_SERVER}auth/token/`,
    }
};


export default api;
