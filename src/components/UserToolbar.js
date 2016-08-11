import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user.actions';

const mapStateToProps = state => ({...state});

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleNewUser: () => dispatch(UserActions.userNew("dummy")),
        handlePlay: () => dispatch(UserActions.choosePlayersForMatch()),
    }
};

@connect(mapStateToProps, mapDispatchToProps)
class UserToolbar extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleNewUser}>New user</button>
                <button onClick={this.props.handlePlay}>Play match</button>
            </div>
        );
    }
}

export default UserToolbar;