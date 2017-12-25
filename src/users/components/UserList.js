import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import UserItem from './UserItem';
import MatchToolbar from './MatchToolbar';
import Loading from '../../shared/components/Loading';
import * as fromUsers from '../users.actions';
import { getMetadata, getSelectedIds, getUsersIds, getUsersSorted } from "../users.reducer";
import Icon from 'react-fontawesome';


const mapStateToProps = (state) => ({
    users: getUsersSorted(state),
    usersIds: getUsersIds(state),
    selected: getSelectedIds(state),
    metadata: getMetadata(state),
});
const mapDispatchToProps = (dispatch, props) => ({
    select: (user) => dispatch(fromUsers.userToggle(user))
});

const UserList = ({users, usersIds, select, selected, metadata: {loadedEntities, loadingEntities}}) => (
    <div>
        <Row>
            <MatchToolbar canPlay={usersIds.length >= 4}/>
        </Row>
        <ListGroup>
            <ListGroupItem listItem>
                <Col xs={8}>
                    <strong> Username </strong>
                </Col>
                <Col xs={4}>
                    <strong> Experience </strong>
                </Col>
            </ListGroupItem>
            {
                loadedEntities && !loadingEntities ?
                    Object.keys(users).length === 0 ?
                        <ListGroupItem className="text-danger text-center" disabled>
                            No active users
                        </ListGroupItem> :
                        Object.values(users).map(user => <UserItem
                            key={user.id}
                            user={user}
                            onSelect={select}
                            selected={selected.includes(user.id)}/>
                        ) :
                    loadingEntities ?
                        <ListGroupItem>
                            <Loading/>
                        </ListGroupItem> :
                        <ListGroupItem className="text-danger text-center" disabled>
                            Failed to get the user list
                        </ListGroupItem>
            }
            {
                usersIds.length > 0 && usersIds.length < 4 &&
                <ListGroupItem className="text-muted text-center" disabled>
                    At least 4 players are required
                </ListGroupItem>
            }
        </ListGroup>
        <p className='text-muted text-right'>
            <Icon name='superpowers' ariaLabel={'Team admin'}/> - club admin
        </p>
    </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(UserList);
