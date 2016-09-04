import { delay } from '../utils/delay';
import users from '../mocks/users.json';

export const fetchUsers = () => delay(1200).then(() => (users));