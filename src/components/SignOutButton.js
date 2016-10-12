import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signOut } from '../actions/auth.actions';
import { fetchLogout } from '../api/connectors';

const mapDispatchToProps = dispatch => ({
    signOut: (response) => response.status === 200 ? dispatch(signOut()) : () => {},
});

@connect(null, mapDispatchToProps)
export default class SignInButton extends Component {
    signOut = () => {
        fetchLogout()
            .then(this.props.signOut);
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