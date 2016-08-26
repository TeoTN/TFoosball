import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import MatchLayout from './components/MatchLayout';
import ProfileLayout from './components/ProfileLayout';
import RankingLayout from './components/RankingLayout';
import TournamentLayout from './components/TournamentLayout';
import userList from './reducers/users.reducer';
import errorList from './reducers/error.reducer';
import './assets/css/styles.css';
import './assets/css/bootstrap.min.css';
import './utils/object';
const reducer = combineReducers({
    userList,
    errorList
});

ReactDOM.render(
    <Provider store={createStore(reducer)}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={MatchLayout} />
                <Route path="profile/(:userid)" component={ProfileLayout} />
                <Route path="ranking" component={RankingLayout} />
                <Route path="tournament" component={TournamentLayout} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
