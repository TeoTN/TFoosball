import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store';
import MatchLayout from './components/MatchLayout';
import ProfileLayout from './components/ProfileLayout';
import RankingLayout from './components/RankingLayout';
import TournamentLayout from './components/TournamentLayout';
import IntroLayout from './components/IntroLayout';
import './assets/css/styles.css';
import './assets/css/bootstrap.min.css';
import './utils/object';

function noIntroWhileAuth(nextState, replace) {
    if (!!localStorage.auth) {
        replace({
            pathname: '/match',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

//TODO Redirect when unauthorized
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={IntroLayout} onEnter={noIntroWhileAuth} />
                <Route path="match" component={MatchLayout} />
                <Route path="profile/(:username)" component={ProfileLayout} />
                <Route path="ranking" component={RankingLayout} />
                <Route path="tournament/(:tid)" component={TournamentLayout} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
