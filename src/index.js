import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import logo from './logo.svg';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userList from './reducers/users.reducer';
import './assets/css/styles.css';
import './assets/css/bootstrap.min.css';

const reducer = combineReducers({
    userList
});

ReactDOM.render(
  <Provider store={createStore(reducer)}>
      <App />
  </Provider>,
  document.getElementById('root')
);
