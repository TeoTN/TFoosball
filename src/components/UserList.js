import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './User';
import { ListGroup, Col } from 'react-bootstrap';

const mapStateToProps = state => ({...state});

@connect(mapStateToProps, null)
class UserList extends Component {
    render() {
        return (
            <Col xs={4}>
                <ListGroup>
                    { this.props.userList.map(user => <User key={user.id} user={user}/>)}
                </ListGroup>
            </Col>
        );
    }
}

export default UserList;
