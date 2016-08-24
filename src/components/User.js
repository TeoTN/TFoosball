import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem } from 'react-bootstrap';
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
            <ListGroupItem bsStyle={user.selected?'success':null}
                           onClick={() => this.props.select(user)}>
                <span key={user.id}>
                    {user.username} ({user.exp}XP)&nbsp;
                </span>
                {/*<a href="#" onClick={() => this.props.handleIncrease(user)}>[+10]</a>&nbsp;*/}
                {/*<a href="#" onClick={() => this.props.handleDecrease(user)}>[-10]</a>&nbsp;*/}
                {/*<a href="#" onClick={() => this.props.handleDeleteUser(user.id)}>[X]</a>&nbsp;*/}
            </ListGroupItem>
        );
    }
}