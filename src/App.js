import React, { Component } from 'react';
import UserToolbar from './components/UserToolbar';
import UserList from './components/UserList';
import Header from './components/Header';
import ErrorBar from './components/ErrorBar';

class App extends Component {
    render() {
        return (
            <main>
                <Header />
                <ErrorBar />
                <UserToolbar/>
                <UserList/>
            </main>
        );
    }
}

export default App;