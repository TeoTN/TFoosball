import { API_SERVER, API_ROOT } from './config';
import { loadAuthState, loadTeamState } from '../persistence';
import { ensureJSON, ensureSuccessOr } from './helpers';

const getDefaultHeaders = () => {
    const auth = loadAuthState();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (auth) {
        headers.append('Authorization', `Token ${auth.token}`);
    }
    return headers;
};

const api = {
    requests: {
        get(url, params, error_msg='Failed to retrieve data from server') {
            let target = url;
            if (params && Object.keys(params).length > 0) {
                const body = new URLSearchParams();
                Object.entries(params).forEach(([key, value]) => body.append(key, value));
                target = `${url}?${body.toString()}`;
            }
            const request = new Request(target, {
                method: 'GET',
                headers: getDefaultHeaders(),
            });
            return fetch(request).then(ensureSuccessOr(error_msg)).then(ensureJSON);
        },
        post(url, body, error_msg='Failed to send data to server') {
            const request = new Request(url, {
                method: 'POST',
                headers: getDefaultHeaders(),
                body: JSON.stringify(body),
            });
            return fetch(request).then(ensureSuccessOr(error_msg)).then(ensureJSON);
        },
        patch(url, body, error_msg='Failed to send data to server') {
            const request = new Request(url, {
                method: 'PATCH',
                headers: getDefaultHeaders(),
                body: JSON.stringify(body),
            });
            return fetch(request).then(ensureSuccessOr(error_msg)).then(ensureJSON);
        },
        ['delete'](url, error_msg='Failed to delete data on server') {
            const request = new Request(url, {
                method: 'DELETE',
                headers: getDefaultHeaders(),
            });
            return fetch(request).then(ensureSuccessOr(error_msg));
        },
    },
    urls: {
        userEntity: (username) => `${API_ROOT}/${api._domain}/users/${username}/`,
        userList: () => `${API_ROOT}/${api._domain}/users/`,
        userMatches: (username) => `${API_ROOT}/${api._domain}/users/${username}/matches/`,
        profile: () => `${API_SERVER}${api._domain}/rest-auth/user/`,
        matchList: () => `${API_ROOT}/${api._domain}/matches/`,
        matchEntity: (id) => `${API_ROOT}/${api._domain}/matches/${id}/`,
        matchPoints: () => `${API_ROOT}/${api._domain}/matches/count-points/`,
        logout: () => `${API_SERVER}${api._domain}/rest-auth/logout/`
    },
    _domain: (() => {
        const teams = loadTeamState();
        return teams ? teams.domain : 'unknown';
    })(),
};


export default api;
