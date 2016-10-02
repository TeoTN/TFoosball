import { delay } from '../utils/delay';
import users from '../mocks/users.json';
import ajax from 'ajax-promise';
import { API_ROOT } from './config';

const requests = {
    users: {
        list: `${API_ROOT}/users`,
    }
};
export const fetchUsers = () => ajax.get(requests.users.list);
