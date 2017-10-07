import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import UserItem from './UserItem';
import MatchToolbar from './MatchToolbar';
import Loading from '../../shared/components/Loading';
import * as UserActions from '../user.actions';


const mapStateToProps = ({users}) => ({users});
const mapDispatchToProps = (dispatch, props) => ({
    select: (user) => dispatch(UserActions.userToggle(user))
});

const UserList = ({users, select}) => (
    <div>
        <Row>
            <MatchToolbar canPlay={users.length >= 4} />
        </Row>
        <ListGroup>
            {
                users.length > 0 && users.length < 4 ?
                    <ListGroupItem className="text-muted text-center" disabled>
                        At least 4 players are required
                    </ListGroupItem> : null
            }
            <ListGroupItem listItem>
                <Col xs={8}>
                    <strong> Username </strong>
                </Col>
                <Col xs={4}>
                    <strong> Experience </strong>
                </Col>
            </ListGroupItem>
            {
                users.length > 0 ?
                    users.map(user => <UserItem key={user.id} user={user} onSelect={select} />) :
                    <ListGroupItem>
                        <Loading/>
                    </ListGroupItem>
            }
        </ListGroup>
    </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(UserList);
