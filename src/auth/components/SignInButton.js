import React from 'react';
import { GoogleLogin } from "react-google-login";
import { OAUTH_CLIENT_ID } from "../../api/config";

export const SignInButton = ({onSuccess, onFailure}) => (
    <GoogleLogin
        clientId={OAUTH_CLIENT_ID}
        buttonText="Let me in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        className="btn btn-danger with-vertical-margin"
        prompt="select_account"
        redirectUri="http://localhost:3000/secret/"
    />
);

export default SignInButton;
