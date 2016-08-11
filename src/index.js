import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import logo from './logo.svg';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import choice from './utils/choice';

const userUpdate = (state, action) => {
    let updated = Object.assign({...state}, {...action});
    delete updated.type;
    return updated;
};


const userList = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER':
            let user = {
                ...action,
                type: undefined
            };
            return [
                ...state,
                user
            ];
        case 'UPDATE_USER':
            return state.map(user =>
                (user.id !== action.id) ? user : userUpdate(user, action)
            );
        case 'DELETE_USER':
            return state.filter( user => user.id !== action.id );
        case 'CHOOSE_PLAYERS':
            const chosen = choice(state.filter(user => user.selected).map(user => user.id), 4);
            return state.map(user => {
                if (chosen.indexOf(user.id) > -1) {
                    return userUpdate(user, { playing: true })
                }
                else {
                    return userUpdate(user, { playing: false });
                }
            });
        default:
            return state;
    }
};

const reducer = combineReducers({
    userList
});

ReactDOM.render(
  <Provider store={createStore(reducer)}>
      <App />
  </Provider>,
  document.getElementById('root')
);
