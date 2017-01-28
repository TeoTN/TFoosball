import React from 'react';
import Header from '../../shared/components/Header';
import InfoBar from '../../shared/components/InfoBar';
import ErrorBar from '../../shared/components/ErrorBar';
import QuestionModal from '../../shared/components/QuestionModal';
import { fetchProfile } from '../../api/connectors';
import * as authActions from '../../shared/auth.actions';
import * as errorActions from '../../shared/error.actions';
import store from '../../store';
import { browserHistory } from 'react-router'

export default class App extends React.Component {
    componentWillMount() {
        const state = store.getState();
        if (!state.auth.hasOwnProperty('token')) {
            return;
        }
        fetchProfile()
            .then(response => store.dispatch(authActions.setProfile(response)))
            .catch(error => store.dispatch(
                errorActions.raiseError('Failed to initialize App with profile'))
            )
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
                <QuestionModal />
                <main className="container">
                    {children}
                </main>
            </div>
        );
    }

}