import checkMobile from '../utils/checkMobile'

export const API_SERVER = process.env.REACT_APP_API_SERVER || 'http://localhost:8000/';
export const API_ROOT = `${API_SERVER}api`;
export const AUTH_REDIR_URL = `${API_SERVER}auth/callback`;
export const OAUTH_CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_ID ||
    '907377379670-suvgso3siks409qfqgmqvfk2c18g4buh.apps.googleusercontent.com';
export const IS_MOBILE = checkMobile();
export const FS_INVITATIONS =
    process.env.REACT_APP_FS_INVITATIONS === 'true' ||
    process.env.REACT_APP_FS_INVITATIONS === true;
export const WHATS_NEW_VERSION = parseInt(process.env.REACT_APP_WHATS_NEW_VERSION, 10) || 0;
