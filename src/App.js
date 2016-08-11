import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';

const userUpdate = (state, action) => {
    return Object.assign({...state}, ...action);
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
        default:
            return state;
    }
};

let lastUserId = 0;
const userNew = (username) => ({
    type: 'ADD_USER',
    id: lastUserId++,
    username,
    exp: 1000
});

const reducer = combineReducers({
    userList
});

const store = createStore(reducer);
console.log(store.getState());

const mapStateToProps = state => ({...state});
const mapDispatchToProps = (dispatch) => {
    return {
        handleNewUser: () => {
            dispatch(userNew("dummy"));
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
class UserList extends Component {
    render() {
        return (
            <ul>
                { store.getState().userList.map(
                    user => <li key={user.id}>{user.username} ({user.exp})</li>
                ) }
            </ul>
        );
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class UserToolbar extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleNewUser}>New user</button>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <UserToolbar/>
                <UserList/>
            </div>
        );
    }
}

export default App;
