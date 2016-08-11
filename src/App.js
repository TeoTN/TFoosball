import React, { Component } from 'react';
import UserToolbar from './components/UserToolbar';
import UserList from './components/UserList';
import Header from './components/Header';

class App extends Component {
    render() {
        return (
            <main>
                <Header />
                <UserToolbar/>
                <UserList/>
            </main>
        );
    }
}

export default App;