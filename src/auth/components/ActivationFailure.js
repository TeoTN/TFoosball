import React from 'react'

export const ActivationFailure = () => (
    <React.Fragment>
        <i className="far fa-frown-open fa-9x"/>
        <h1>Oh snap...</h1>
        <p>
            <strong>We're sorry</strong>, this time we couldn't activate your account. Please check if:
        </p>
        <ul>
            <li>The invitation email is older than 48 hours?</li>
            <li>The invitation email was sent to different email than you've logged in?</li>
            <li>The activation link was already used?</li>
        </ul>
    </React.Fragment>
);

export default ActivationFailure;
