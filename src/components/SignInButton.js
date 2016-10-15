import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import make_popup from '../utils/make_popup';
import serialize from '../utils/serialize';

export default class SignInButton extends Component {
    constructor(props) {
        super(props);
        this.google_endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
        this.auth_request_data = serialize({
            response_type: 'token',
            client_id: '907377379670-suvgso3siks409qfqgmqvfk2c18g4buh.apps.googleusercontent.com',
            redirect_uri: 'http://localhost:8000/auth/callback', //TODO
            scope: 'email',
        });
    }

    prompt = () => {
        const url = `${this.google_endpoint}?${this.auth_request_data}`;
        make_popup(url, 'Let me in with Google', 500, 600);
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