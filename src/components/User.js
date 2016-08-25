import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem, Col } from 'react-bootstrap';
import * as UserActions from '../actions/user.actions';

const mapDispatchToProps = (dispatch, props) => {
    return {
        select: (user) => dispatch(UserActions.userToggle(user))
    };
};

@connect(null, mapDispatchToProps)
export default class User extends Component {
    render() {
        const {user} = this.props;
        return (
            <ListGroupItem bsStyle={user.selected?'success':null} key={user.id}
                           onClick={() => this.props.select(user)}>
                <Col xs={8}>
                    {user.username}
                </Col>
                <Col xs={4}>
                    {user.exp}XP
                </Col>
            </ListGroupItem>
        );
    }
}