import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user.actions';

const mapDispatchToProps = (dispatch, props) => {
    return {
        handleDeleteUser: (id) => {
            dispatch(UserActions.userDelete(id))
        },
        handleIncrease: (user) => dispatch(UserActions.userIncreaseExp(user)),
        handleDecrease: (user) => dispatch(UserActions.userDecreaseExp(user)),
        select: (user) => dispatch(UserActions.userToggle(user))
    };
};

@connect(null, mapDispatchToProps)
export default class User extends Component {
    render() {
        const {user} = this.props;
        return (
            <li className="user">
                { user.playing ? <span> + </span> : null }
                <span key={user.id} onClick={() => this.props.select(user)}
                    style={{background: user.selected?'green':'white'}}>
                    {user.username} ({user.exp})&nbsp;
                </span>
                <a href="#" onClick={() => this.props.handleIncrease(user)}>[+10]</a>&nbsp;
                <a href="#" onClick={() => this.props.handleDecrease(user)}>[-10]</a>&nbsp;
                <a href="#" onClick={() => this.props.handleDeleteUser(user.id)}>[X]</a>&nbsp;
            </li>
        );
    }
}