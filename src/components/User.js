import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem, Col } from 'react-bootstrap';
import * as UserActions from '../actions/user.actions';

const mapDispatchToProps = (dispatch, props) => ({
    select: (user) => dispatch(UserActions.userToggle(user))
});

const selectedColor = 'success';

@connect(null, mapDispatchToProps)
export default class User extends Component {
    constructor(props) {
        super(props);

        this.toggle = () => {
            this.props.select(this.props.user);
        };
    }
    render() {
        const {user} = this.props;
        return (
            <ListGroupItem bsStyle={(user.selected || user.playing)?selectedColor:null}
                           onClick={this.toggle}>
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