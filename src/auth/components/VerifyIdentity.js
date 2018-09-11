import React from 'react'
import SignInButton from "./SignInButton";
import { invitationAuthorized } from "../auth.actions";
import { connect } from 'react-redux';
import { raiseError } from "../../shared/notifier.actions";

const mapDispatchToProps = (dispatch) => ({
    onSignedIn: (authData) => dispatch(invitationAuthorized(authData)),
    loginFailure: () => dispatch(raiseError('Failed to sign in. Please try again.')),
});

const VerifyIdentityBody = ({ onSignedIn, loginFailure }) => (
    <React.Fragment>
        <i className="far fa-envelope-open fa-9x"/>
        <h1>Verify your identity</h1>
        <p>You have been invited to join us playing foosball.</p>
        <p>
            We want to ensure that you are the owner of the account you are using to join us.
            Before the game starts, please verify your identity and sign in with
            the <strong>invited@email.com</strong> email:
        </p>
        <SignInButton onSuccess={onSignedIn} onFailure={loginFailure} />
    </React.Fragment>
);

export const VerifyIdentity = connect(null, mapDispatchToProps)(VerifyIdentityBody);

export default VerifyIdentity;
