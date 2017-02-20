import React from 'react';
import ReactDOM from 'react-dom';
import App from './homepage/components/App';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store';
import MatchLayout from './play/components/PlayLayout';
import ProfileLayout from './profile/components/ProfileLayout';
import RankingLayout from './ranking/components/RankingLayout';
import MatchesLayout from './matches/components/MatchesLayout';
import SettingsLayout from './settings/components/SettingsLayout';
import TeamAssignment  from './homepage/components/TeamAssignment';
import IntroLayout from './homepage/components/IntroLayout';
import ProfileMatches from './profile/components/ProfileMatches';
import './assets/css/styles.css';
import './assets/css/bootstrap.min.css';
import './utils/object';
import './utils/doughnutText';
import {loadState} from './persistence';

function requireAuth(nextState, replace, next) {
    const persistedState = loadState();
    if (!(persistedState.hasOwnProperty('auth') && persistedState.auth.hasOwnProperty('token'))) {
        replace({
            pathname: "/",
            state: {nextPathname: nextState.location.pathname}
        });
    }
    next();
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={IntroLayout} />
                <Route path="welcome" component={TeamAssignment} onEnter={requireAuth} />
                <Route path="match" component={MatchLayout} onEnter={requireAuth} />
                <Route path="profile/:username" component={ProfileLayout} onEnter={requireAuth}>
                    <Route path="stats" />
                    <Route path="matches(/:page)" component={ProfileMatches} />
                </Route>
                <Route path="ranking" component={RankingLayout} onEnter={requireAuth} />
                <Route path="matches/(:page)" component={MatchesLayout} onEnter={requireAuth} />
                <Route path="settings" component={SettingsLayout} onEnter={requireAuth} />
                {/*<Route path="tournament/(:tid)" component={TournamentLayout} />*/}
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
