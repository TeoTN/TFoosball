import React from 'react';
import { ListGroupItem, Col } from 'react-bootstrap';

const selectedColor = 'success';

const UserItem = ({user, onSelect}) => (
    <ListGroupItem
        bsStyle={ user.selected ? selectedColor : null }
        onClick={ () => onSelect(user) }>
            <Col xs={8}>
                {user.username}
            </Col>
            <Col xs={4}>
                {user.exp}XP
            </Col>
    </ListGroupItem>
);

export default UserItem;