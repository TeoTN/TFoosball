import React, { Component } from 'react';
import UserToolbar from './components/UserToolbar';
import UserList from './components/UserList';
import './App.css';


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