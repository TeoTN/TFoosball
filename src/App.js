import React from 'react';
import Header from './components/Header';
import ErrorBar from './components/ErrorBar';
import { fetchProfile } from './api/connectors';
import * as profileActions from './actions/profile.actions';
import * as errorActions from './actions/error.actions';
import store from './store';
import { ensureSuccessOr, ensureJSON } from './api/helpers';

(function initProfile() {
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
        );
})();

export default (props) => (
    <div>
        <Header />
        <ErrorBar />
        <main className="container">
            {props.children}
        </main>
    </div>
);
