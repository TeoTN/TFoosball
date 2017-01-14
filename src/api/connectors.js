import { API_SERVER, API_ROOT } from './config';
import { loadAuthState } from '../persistence';
import { ensureJSON, ensureSuccessOr } from './helpers';

const urls = {
    users: `${API_ROOT}users/`,
    matches: `${API_ROOT}matches/`,
    profile: `${API_SERVER}rest-auth/user/`,
    logout: `${API_SERVER}rest-auth/logout/`,
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

export const fetchProfile = (username) => {
    const target = username ? `${urls.users}${username}/` : urls.profile;
    const request = new Request(target, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request)
        .then(ensureSuccessOr('Unable to fetch profile'))
        .then(ensureJSON);
};

export const fetchUsers = () => {
    const request = new Request(urls.users, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request)
        .then(ensureSuccessOr('Unable to fetch user list'))
        .then(ensureJSON);
};

export const fetchLogout = () => {
    const request = new Request(urls.logout, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request)
        .then(ensureSuccessOr('Unable to sign out'));
};

export const fetchUserMatches = (username) => {
    const request = new Request(`${urls.users}${username}/matches/`, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request)
        .then(ensureSuccessOr('Unable to fetch user matches list'))
        .then(ensureJSON);
};

export const publishMatch = (match) => {
    const request = new Request(urls.matches, {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(match)
    });
    return fetch(request)
        .then(ensureSuccessOr('Failed to publish match'))
        .then(ensureJSON);
};

export const removeMatch = (id) => {
    const request = new Request(`${url.matches}/${id}`, {
        method: 'DELETE',
        headers: getDefaultHeaders(),
    });
    return fetch(request)
        .then(ensureSuccessOr(`Failed to delete match of id#${id}`))
        .then(ensureJSON);
};

export const updateProfile = (partialData) => {
    const request = new Request(urls.profile, {
        method: 'PATCH',
        headers: getDefaultHeaders(),
        body: JSON.stringify(partialData)
    });
    return fetch(request)
        .then(ensureSuccessOr('Failed to update profile'))
        .then(ensureJSON);
};

export const fetchMatchPoints = (players) => {
    const params = Object.entries(players).map(([k, v]) => `${k}=${v}`).join('&');
    const request = new Request(`${urls.matches}count-points/?${params}`, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request)
        .then(ensureSuccessOr('Unable to fetch match potential score'))
        .then(ensureJSON);
};
