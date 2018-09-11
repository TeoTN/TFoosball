import React from 'react'
import { Button } from "react-bootstrap";
import { invitationFinalize } from "../auth.actions";
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    invitationFinalize: () => dispatch(invitationFinalize()),
});

const ActivationSuccessBody = ({ invitationFinalize }) => (
    <React.Fragment>
        <i className="fas fa-check fa-9x"/>
        <h1>We're all set!</h1>
        <p>
            Your account was activated. You have joined <strong>Developers Team</strong> club and
            your username is <strong>Ptysiu</strong>.
        </p>
        <Button bsStyle="success" onClick={invitationFinalize}>Let's go!</Button>
    </React.Fragment>
);
export const ActivationSuccess = connect(mapStateToProps, mapDispatchToProps)(ActivationSuccessBody);

export default ActivationSuccess;
