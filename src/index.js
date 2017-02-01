import React from 'react';
import ReactDOM from 'react-dom';
import App from './homepage/components/App';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store';
import MatchLayout from './play/components/PlayLayout';
import ProfileLayout from './profile/components/ProfileLayout';
import RankingLayout from './ranking/components/RankingLayout';
import MatchesLayout  from './matches/components/MatchesLayout';
import SettingsLayout  from './settings/components/SettingsLayout';
import IntroLayout from './homepage/components/IntroLayout';
import ProfileMatches from './profile/components/ProfileMatches';
import './assets/css/styles.css';
import './assets/css/bootstrap.min.css';
import './utils/object';
import './utils/doughnutText';
import { loadAuthState } from './persistence';

function checkIfShouldDisplayIntro(nextState, replace) {
    const auth = loadAuthState();
    const { profile } = store.getState();
    if (auth && !!profile) {
        replace({
            pathname: '/match',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

//TODO Redirect when unauthorized
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/"
                       component={IntroLayout}
                       onEnter={checkIfShouldDisplayIntro} />
                <Route path="match" component={MatchLayout} />
                <Route path="profile/:username" component={ProfileLayout}>
                    <Route path="stats" />
                    <Route path="matches(/:page)" component={ProfileMatches} />
                </Route>
                <Route path="ranking" component={RankingLayout} />
                <Route path="matches/(:page)" component={MatchesLayout} />
                <Route path="settings" component={SettingsLayout} />
                {/*<Route path="tournament/(:tid)" component={TournamentLayout} />*/}
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
