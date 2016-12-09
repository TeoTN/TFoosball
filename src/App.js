import React, { Component } from 'react';
import Header from './components/Header';
import InfoBar from './components/InfoBar';
import ErrorBar from './components/ErrorBar';
import { fetchProfile } from './api/connectors';
import * as profileActions from './actions/profile.actions';
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
            .then(ensureSuccessOr('Failed to initialize profile'))
            .then(ensureJSON)
            .then(
                (response) => store.dispatch(profileActions.fetchProfile(response)),
            )
            .catch(
                (error) => store.dispatch(errorActions.raiseError('Failed to initialize profile'))
            )
            .then(this.ensureUsernameIsPresent);
    }

    ensureUsernameIsPresent = () => {
        const state = store.getState();
        const { username } = state.profile;
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