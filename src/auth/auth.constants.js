import { BACKEND_CLIENT_ID, BACKEND_CLIENT_SECRET } from "../api/config";

export const exchangeTokenRequestBody = {
    grant_type: 'convert_token',
    client_id: BACKEND_CLIENT_ID,
    client_secret: BACKEND_CLIENT_SECRET,
    backend: 'google-oauth2',
};

export const signOutRequestBody = {
    client_id: BACKEND_CLIENT_ID,
};
