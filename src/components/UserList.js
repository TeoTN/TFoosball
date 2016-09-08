import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import User from './User';
import UserToolbar from './MatchToolbar';
import { fetchUsers } from '../api/users';
import { receiveUsers } from '../actions/user.actions';

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
};

const mapDispatchToProps = (dispatch, props) => ({
    receiveUsers: (response) => dispatch(receiveUsers(response)),
});

@connect(mapStateToProps, mapDispatchToProps)
class UserList extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetchUsers()
            .then(this.props.receiveUsers);
    }

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
                    { this.props.users.map(user => <User key={user.id} user={user}/>)}
                </ListGroup>
            </div>
        );
    }
}

export default UserList;
