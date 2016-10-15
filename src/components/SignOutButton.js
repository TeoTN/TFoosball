import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signOut } from '../actions/auth.actions';
import { fetchLogout } from '../api/connectors';
import { raiseError } from '../actions/error.actions';

const mapDispatchToProps = dispatch => ({
    dispatchSignOut: () => dispatch(signOut()),
    raiseFailure: () => dispatch(raiseError('Failed to sign out properly.')),
});

@connect(null, mapDispatchToProps)
export default class SignInButton extends Component {
    signOut = () => {
        fetchLogout()
            .then(this.onSignOutDone);
    };

    onSignOutDone = (response) => {
        if (response.status === 200) {
            return this.props.dispatchSignOut();
        }
        return this.props.raiseFailure();
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