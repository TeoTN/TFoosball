import React from 'react';
import Header from '../../shared/components/Header';
import InfoBar from '../../shared/components/InfoBar';
import ErrorBar from '../../shared/components/ErrorBar';
import QuestionModal from '../../shared/components/QuestionModal';
import api from '../../api';
import * as authActions from '../../shared/auth.actions';
import * as errorActions from '../../shared/error.actions';
import store from '../../store';

export default class App extends React.Component {
    componentWillMount() {
        const state = store.getState();
        if (!state.auth.hasOwnProperty('token')) {
            return;
        }
        const url = api.urls.profile();
        api.requests.get(url)
            .then(response => store.dispatch(authActions.setProfile(response)))
            .catch(error => store.dispatch(
                errorActions.raiseError('Failed to initialize App with profile'))
            )
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <Header />
                <InfoBar />
                <ErrorBar />
                <QuestionModal />
                <main className="container-fluid">
                    {children}
                </main>
            </div>
        );
    }

}