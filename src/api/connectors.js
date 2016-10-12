// import { delay } from '../utils/delay';
// import users from '../mocks/users.json';
import ajax from 'ajax-promise';
import { API_ROOT } from './config';

const requests = {
    users: `${API_ROOT}/users/`,
    matches: `${API_ROOT}/matches/`,
    logout: `${API_ROOT}/rest-auth/logout/`,
};

export const fetchUsers = () => ajax.get(requests.users);
export const fetchMatches = () => ajax.get(requests.matches);
export const publishMatch = (match) => ajax.post(requests.matches, match);
