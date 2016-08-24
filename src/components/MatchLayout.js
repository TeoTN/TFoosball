import React, { Component } from 'react';
import UserToolbar from './UserToolbar';
import UserList from './UserList';

class MatchLayout extends Component {
    render() {
        return (
            <div>
                <h1>New match</h1>
                <UserToolbar/>
                <UserList/>
            </div>
        );
    }
}

export default MatchLayout;