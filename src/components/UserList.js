import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './User';

const mapStateToProps = state => ({...state});

@connect(mapStateToProps, null)
class UserList extends Component {
    render() {
        return (
            <ul>
                { this.props.userList.map(user => <User key={user.id} user={user}/>)}
            </ul>
        );
    }
}

export default UserList;
