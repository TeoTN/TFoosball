import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import UserItem from './UserItem';
import MatchToolbar from './MatchToolbar';
import Loading from '../../shared/components/Loading';
import * as fromUsers from '../users.actions';
import { getSelectedIds, getUsers, getUsersIds } from "../users.reducer";


const mapStateToProps = (state) => ({
    users: getUsers(state),
    usersIds: getUsersIds(state),
    selected: getSelectedIds(state),
});
const mapDispatchToProps = (dispatch, props) => ({
    select: (user) => dispatch(fromUsers.userToggle(user))
});

const UserList = ({users, usersIds, select, selected}) => (
    <div>
        <Row>
            <MatchToolbar canPlay={usersIds.length >= 4}/>
        </Row>
        <ListGroup>
            {
                usersIds.length > 0 && usersIds.length < 4 ?
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
                usersIds.length > 0 ?
                    Object.values(users).map(user => <UserItem
                        key={user.id}
                        user={user}
                        onSelect={select}
                        selected={selected.includes(user.id)}/>
                    ) :
                    <ListGroupItem>
                        <Loading/>
                    </ListGroupItem>
            }
        </ListGroup>
    </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(UserList);
