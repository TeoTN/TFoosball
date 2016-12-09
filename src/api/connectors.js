// import { delay } from '../utils/delay';
// import users from '../mocks/users.json';
import { URL_ROOT, API_ROOT } from './config';
import { loadAuthState } from '../persistence';
import url from 'url';

const urls = {
    users: url.resolve(API_ROOT, 'users/'),
    matches: url.resolve(API_ROOT, 'matches/'),
    profile: url.resolve(URL_ROOT, 'rest-auth/user/'),
    logout: url.resolve(URL_ROOT, 'rest-auth/logout/'),
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
    return fetch(request);
};

export const fetchUsers = () => {
    const request = new Request(urls.users, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request);
};

export const fetchLogout = () => {
    const request = new Request(urls.logout, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request);
};

export const fetchMatches = () => {
    const request = new Request(urls.matches, {
        method: 'GET',
        headers: getDefaultHeaders(),
    });
    return fetch(request);
};

export const publishMatch = (match) => {
    const request = new Request(urls.matches, {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(match)
    });
    return fetch(request);
};

export const updateProfile = (partialData) => {
    const request = new Request(urls.profile, {
        method: 'PATCH',
        headers: getDefaultHeaders(),
        body: JSON.stringify(partialData)
    });
    return fetch(request);
};
