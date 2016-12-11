import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PromiseWindow from 'promise-window';
import serialize from '../utils/serialize';
import { connect } from 'react-redux';
import { raiseError } from '../actions/error.actions';
import * as authActions from '../actions/auth.actions';
import { fetchProfile } from '../api/connectors';
import { ensureJSON, ensureSuccessOr } from '../api/helpers';
import { browserHistory } from 'react-router'
import { AUTH_REDIR_URL, OAUTH_CLIENT_ID } from '../api/config';

const mapDispatchToProps = (dispatch) => ({
    loadProfile: (response) => dispatch(authActions.setProfile(response)),
    setToken: ({token}) => dispatch(authActions.setToken(token)),
    raiseError: (msg) => dispatch(raiseError(msg)),
});

@connect(null, mapDispatchToProps)
export default class SignInButton extends Component {
    constructor(props) {
        super(props);
        const google_endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
        const auth_request_data = serialize({
            response_type: 'token',
            client_id: OAUTH_CLIENT_ID,
            redirect_uri: AUTH_REDIR_URL,
            scope: 'email',
        });
        this.url = `${google_endpoint}?${auth_request_data}`;
        this.promptConfig = {
            width: 500,
            height: 600,
            windowName: 'TFoosball - Let me in with Google',
        };
    }

    prompt = () => {
        const promptPromise = new PromiseWindow(this.url, this.promptConfig);
        const { setToken, loadProfile } = this.props;

        promptPromise
            .open()
            .then(setToken)
            .then(() => fetchProfile())
            .then(ensureSuccessOr('Failed to fetch profile'))
            .then(ensureJSON)
            .then(loadProfile)
            .then(() => browserHistory.push('/match'))
            .catch(this.handleError);
    };

    handleError = (error) => {
        const { raiseError } = this.props;
        switch(error) {
            case 'blocked':
            case 'closed':
                raiseError('Failed to start authenticating. Please, try again.');
                break;
            case 'failure':
                raiseError('Failed to log in.');
                break;
            default:
                raiseError(error);
                break;
        }
    };

    render() {
        return (
            <Button onClick={this.prompt}
                    bsStyle="danger"
                    style={{marginTop: '12px'}}
                    bsSize="small">
                Let me in with Google
            </Button>
        );
    }
}