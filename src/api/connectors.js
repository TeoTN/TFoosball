// import { delay } from '../utils/delay';
// import users from '../mocks/users.json';
import { URL_ROOT, API_ROOT } from './config';
import { loadAuthState } from '../persistence';

const url = {
    users: `${API_ROOT}/users/`,
    matches: `${API_ROOT}/matches/`,
    profile: `${URL_ROOT}/rest-auth/user/`,
    logout: `${URL_ROOT}/rest-auth/logout/`,
};

const getDefaultHeaders = () => {
    const auth = loadAuthState();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (auth) {
        headers.append('Authorization', `Token ${auth.token}`);
    }
    return headers;
};

export const fetchProfile = () => {
    const request = new Request(url.profile, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request);
};

export const fetchUsers = () => {
    const request = new Request(url.users, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request);
};

export const fetchLogout = () => {
    const request = new Request(url.logout, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request);
};

export const fetchMatches = () => {
    const request = new Request(url.matches, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request);
};

export const publishMatch = (match) => {
    const request = new Request(url.matches, {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(match)
    });
    return fetch(request);
};

export const updateProfile = (partialData) => {
    const request = new Request(url.profile, {
        method: 'PATCH',
        headers: getDefaultHeaders(),
        body: JSON.stringify(partialData)
    });
    return fetch(request);
};
