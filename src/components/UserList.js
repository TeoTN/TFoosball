import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import User from './User';
import MatchToolbar from './MatchToolbar';
import Loading from './Loading';
import * as UserActions from '../actions/user.actions';


const mapStateToProps = ({users}) => ({users});
const mapDispatchToProps = (dispatch, props) => ({
    select: (user) => dispatch(UserActions.userToggle(user))
});

const UserList = ({users, select}) => (
    <div>
        <Row>
            <MatchToolbar/>
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
            {
                users.length > 0 ?
                    users.map(user => <User key={user.id} user={user} onSelect={select} />) :
                    <ListGroupItem>
                        <Loading/>
                    </ListGroupItem>
            }
        </ListGroup>
    </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(UserList);
