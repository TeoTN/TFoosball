import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user.actions';


const mapDispatchToProps = (dispatch, props) => {
    return {
        handleNewUser: () => dispatch(UserActions.userNew("dummy")),
    }
};

@connect(null, mapDispatchToProps)
class UserToolbar extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleNewUser}>New user</button>
            </div>
        );
    }
}

export default UserToolbar;