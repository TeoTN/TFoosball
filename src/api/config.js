window.env = process.env;
export const URL_ROOT = process.env.API_ROOT || 'http://localhost:8000/';
export const API_ROOT = `${URL_ROOT}api/`;
export const AUTH_REDIR_URL = `${URL_ROOT}auth/callback`;
export const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID ||
    '907377379670-suvgso3siks409qfqgmqvfk2c18g4buh.apps.googleusercontent.com';