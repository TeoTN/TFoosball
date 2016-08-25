import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './User';
import UserToolbar from './MatchToolbar';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';

const mapStateToProps = state => ({...state});

@connect(mapStateToProps, null)
class UserList extends Component {
    render() {
        return (
            <div>
                <Row>
                    <UserToolbar/>
                </Row>
                <ListGroup>
                    <ListGroupItem onClick={()=>{}}>
                        <Col xs={8}>
                            <strong> Username </strong>
                        </Col>
                        <Col xs={4}>
                            <strong> Experience </strong>
                        </Col>
                    </ListGroupItem>
                    { this.props.userList.map(user => <User key={user.id} user={user}/>)}
                </ListGroup>
            </div>
        );
    }
}

export default UserList;
