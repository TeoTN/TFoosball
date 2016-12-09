import React, { Component } from 'react';
import Header from './components/Header';
import InfoBar from './components/InfoBar';
import ErrorBar from './components/ErrorBar';
import { fetchProfile } from './api/connectors';
import * as authActions from './actions/auth.actions';
import * as errorActions from './actions/error.actions';
import store from './store';
import { ensureSuccessOr, ensureJSON } from './api/helpers';
import { browserHistory } from 'react-router'

export default class App extends Component {
    componentWillMount() {
        const state = store.getState();
        if (!state.auth.hasOwnProperty('token')) {
            return;
        }
        fetchProfile()
            .then(ensureSuccessOr('Failed to get your data from the server'))
            .then(ensureJSON)
            .then(response => store.dispatch(authActions.setProfile(response)))
            .catch(error => store.dispatch(errorActions.raiseError('Failed to initialize profile')))
            .then(this.ensureUsernameIsPresent);
    }

    ensureUsernameIsPresent = () => {
        const { auth: {profile: {username}} } = store.getState();
        if (!username) {
            browserHistory.push('/welcome');
        }
    };

    render() {
        const { children } = this.props;
        return (
            <div>
                <Header />
                <InfoBar />
                <ErrorBar />
                <main className="container">
                    {children}
                </main>
            </div>
        );
    }

}