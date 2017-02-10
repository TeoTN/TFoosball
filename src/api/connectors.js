import { API_SERVER, API_ROOT } from './config';
import { loadAuthState } from '../persistence';
import { ensureJSON, ensureSuccessOr } from './helpers';

export const getTeamDomain = () => window.location.pathname.split('/')[1];
export const getUrls = (domain = getTeamDomain()) => ({
    users: `${API_ROOT}/${domain}/users/`,
    matches: `${API_ROOT}/${domain}/matches/`,
    profile: `${API_SERVER}${domain}/rest-auth/user/`,
    logout: `${API_SERVER}${domain}/rest-auth/logout/`,
});

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
    const urls = getUrls();
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
    const urls = getUrls();
    const request = new Request(urls.users, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request)
        .then(ensureSuccessOr('Unable to fetch user list'))
        .then(ensureJSON);
};

export const fetchMatches = (page) => {
    const urls = getUrls();
    const request = new Request(`${urls.matches}?page=${page}`, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request)
        .then(ensureSuccessOr('Unable to fetch match list'))
        .then(ensureJSON);
};

export const fetchLogout = () => {
    const urls = getUrls();
    const request = new Request(urls.logout, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request)
        .then(ensureSuccessOr('Unable to sign out'));
};

export const fetchUserMatches = (username, page=1) => {
    const urls = getUrls();
    const request = new Request(`${urls.users}${username}/matches/?page=${page}`, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request)
        .then(ensureSuccessOr('Unable to fetch user matches list'))
        .then(ensureJSON);
};

export const publishMatch = (match) => {
    const urls = getUrls();
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
    const urls = getUrls();
    const request = new Request(`${urls.matches}${id}/`, {
        method: 'DELETE',
        headers: getDefaultHeaders(),
    });
    return fetch(request)
        .then(ensureSuccessOr(`Failed to delete match of id#${id}`));
};

export const updateMember = (username, partialData) => {
    const urls = getUrls();
    const request = new Request(`${urls.users}${username}/`, {
        method: 'PATCH',
        headers: getDefaultHeaders(),
        body: JSON.stringify(partialData)
    });
    return fetch(request)
        .then(ensureSuccessOr('Failed to update team profile'))
        .then(ensureJSON);
};

export const updateProfile = (partialData) => {
    const urls = getUrls();
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
    const urls = getUrls();
    const params = Object.entries(players).map(([k, v]) => `${k}=${v}`).join('&');
    const request = new Request(`${urls.matches}count-points/?${params}`, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request)
        .then(ensureSuccessOr('Unable to fetch match potential score'))
        .then(ensureJSON);
};
