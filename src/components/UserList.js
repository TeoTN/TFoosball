import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import User from './User';
import UserToolbar from './MatchToolbar';
import { fetchUsers } from '../api/connectors';
import { receiveUsers } from '../actions/user.actions';
import { raiseError } from '../actions/error.actions';

const mapStateToProps = (state) => ({...state});

const mapDispatchToProps = (dispatch, props) => ({
    receiveUsers: (data) => dispatch(receiveUsers(data)),
    raiseUnauthorized: () => dispatch(raiseError("Unauthorized - please log in.")),
    raiseUnexpected: () => dispatch(raiseError("Unexpected error while fetching user list")),
});

@connect(mapStateToProps, mapDispatchToProps)
class UserList extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetchUsers()
            .then(this.onFetchDone)
            .then(this.props.receiveUsers);
    }

    onFetchDone = (response) => {
        if (response.status === 200) {
            return response.json();
        }
        else if (response.status === 401) {
            this.props.raiseUnauthorized();
        }
        else {
            this.props.raiseUnexpected();
        }
    };

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
                    { this.props.users.map(user => <User key={user.id} user={user} />)}
                </ListGroup>
            </div>
        );
    }
}

export default UserList;
