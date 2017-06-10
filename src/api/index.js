import { API_ROOT } from './config';
import { loadState } from '../persistence';
import { ensureJSON, ensureSuccessOr } from './helpers';

const getDefaultHeaders = () => {
    const persistedState = loadState();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (persistedState && persistedState.hasOwnProperty('auth')) {
        headers.append('Authorization', `Token ${persistedState.auth.token}`);
    }
    return headers;
};

const api = {
    requests: {
        get(url, params, error_msg='Failed to retrieve data from server') {
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
                .then(ensureSuccessOr(error_msg))
                .then(ensureJSON);
        },
        post(url, body, error_msg='Failed to send data to server') {
            const request = new Request(url, {
                method: 'POST',
                headers: getDefaultHeaders(),
                body: JSON.stringify(body),
            });
            return fetch(request)
                .then(ensureSuccessOr(error_msg))
                .then(ensureJSON);
        },
        patch(url, body, error_msg='Failed to send data to server') {
            const request = new Request(url, {
                method: 'PATCH',
                headers: getDefaultHeaders(),
                body: JSON.stringify(body),
            });
            return fetch(request)
                .then(ensureSuccessOr(error_msg))
                .then(ensureJSON);
        },
        ['delete'](url, error_msg='Failed to delete data on server') {
            const request = new Request(url, {
                method: 'DELETE',
                headers: getDefaultHeaders(),
            });
            return fetch(request)
                .then(ensureSuccessOr(error_msg));
        },
    },
    urls: {
        playerList: () => `${API_ROOT}/players/`,
        playerEntity: (player_id) => `${API_ROOT}/players/${player_id}/`,
        playerEntityInvite: (player_id) => `${API_ROOT}/players/${player_id}/invite/`,
        teamList: () => `${API_ROOT}/teams/`,
        teamListJoined: () => `${API_ROOT}/teams/joined/`,
        teamJoin: () => `${API_ROOT}/teams/join/`,
        teamEntity: (team_id) => `${API_ROOT}/teams/${team_id}/`,
        teamMemberList: (team_id) => `${API_ROOT}/teams/${team_id}/members/`,
        teamMemberEntity: (team_id, member_id) => `${API_ROOT}/teams/${team_id}/members/${member_id}/`,
        teamMatchList: (team_id) => `${API_ROOT}/teams/${team_id}/matches/`,
        teamMatchEntity: (team_id, match_id) => `${API_ROOT}/teams/${team_id}/matches/${match_id}/`,
        teamMatchPoints: (team_id) => `${API_ROOT}/teams/${team_id}/matches/points/`,
        profile: () => `${API_ROOT}/rest-auth/user/`,
        logout: () => `${API_ROOT}/rest-auth/logout/`
    }
};


export default api;
