import React from 'react';
import ReactDOM from 'react-dom';
import App from './homepage/components/App';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store';
import PlayLayout from './play/components/PlayLayout';
import { ProfileLayout, ProfileMatches, ProfileTeams, ProfileSettings } from './profile/components';
import RankingLayout from './ranking/components/RankingLayout';
import MatchesLayout from './matches/components/MatchesLayout';
import SettingsLayout from './settings/components/SettingsLayout';
import TeamAssignment  from './homepage/components/TeamAssignment';
import IntroLayout from './homepage/components/IntroLayout';
import '@tfoosball/tfoostrap';
import './utils/object';
import './utils/doughnutText';
import {loadState} from './persistence';

const hasToken = (state) => state &&
    state.hasOwnProperty('auth') &&
    state.auth.hasOwnProperty('token');

const hasJoinedTeam = (state) => state &&
    state.hasOwnProperty('teams') &&
    state.teams.hasOwnProperty('joined') &&
    state.teams.joined.length >= 1;

function requireAuth(nextState, replace, next) {
    const persistedState = loadState();
    if (!hasToken(persistedState)) {
        replace({
            pathname: "/",
            state: {nextPathname: nextState.location.pathname}
        });
    }
    next();
}
function homepage(nextState, replace, next) {
    const persistedState = loadState();
    const isToken = hasToken(persistedState);
    const isJoinedTeam = hasJoinedTeam(persistedState)
    if (isToken && isJoinedTeam) {
        replace({
            pathname: "/match",
            state: {nextPathname: nextState.location.pathname}
        });
    } else if (isToken && !isJoinedTeam) {
        replace({
            pathname: "/welcome",
            state: {nextPathname: nextState.location.pathname}
        });
    }
    next();
}

function hasTeams(nextState, replace, next) {
    const persistedState = loadState();
    if (hasJoinedTeam(persistedState)) {
        replace({
            pathname: "/match",
            state: {nextPathname: nextState.location.pathname}
        });
    }
    next();
}

const chain = (argsArr) => (nextState, replace, next) => argsArr.forEach(fun => fun(nextState, replace, next));

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={IntroLayout} onEnter={homepage} />
                <Route path="welcome" component={TeamAssignment} onEnter={chain([requireAuth, hasTeams])} />
                <Route path="match" component={PlayLayout} onEnter={requireAuth} />
                <Route path="profile/:username" component={ProfileLayout} onEnter={requireAuth}>
                    <Route path="stats" />
                    <Route path="matches(/:page)" component={ProfileMatches} />
                    <Route path="teams" component={ProfileTeams} />
                    <Route path="settings" component={ProfileSettings} />
                </Route>
                <Route path="ranking" component={RankingLayout} onEnter={requireAuth} />
                <Route path="matches/(:page)" component={MatchesLayout} onEnter={requireAuth} />
                <Route path="settings" component={SettingsLayout} onEnter={requireAuth} />
                {/*<Redirect from="settings" to="/profile/username/settings" />*/}

                {/*<Route path="tournament/(:tid)" component={TournamentLayout} />*/}
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
