import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signedOut } from '../actions/auth.actions';
import { fetchLogout } from '../api/connectors';
import { raiseError } from '../actions/error.actions';
import { ensureSuccessOr } from '../api/helpers';

const mapDispatchToProps = dispatch => ({
    signedOut: () => dispatch(signedOut()),
    raiseError: (msg) => dispatch(raiseError(msg)),
});

@connect(null, mapDispatchToProps)
export default class SignInButton extends Component {
    signOut = () => {
        const { signedOut, raiseError } = this.props;
        fetchLogout()
            .then(ensureSuccessOr('Failed to sign out properly'))
            .then(signedOut)
            .catch(raiseError);
    };

    render() {
        return (
            <Button onClick={this.signOut}
                    bsStyle="danger"
                    style={{marginTop: '12px'}}
                    bsSize="small">
                Sign out
            </Button>
        );
    }
}