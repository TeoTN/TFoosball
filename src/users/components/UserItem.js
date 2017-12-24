import React from 'react';
import { ListGroupItem, Col } from 'react-bootstrap';
import Icon from 'react-fontawesome';

const selectedColor = 'success';

const UserItem = ({user, onSelect, selected}) => (
    <ListGroupItem
        bsStyle={selected ? selectedColor : null}
        onClick={() => onSelect(user)}>
        <Col xs={8}>
            {user.username}&nbsp;
            {user.is_team_admin && <Icon name='superpowers' ariaLabel={'Team admin'} className='text-danger'/>}
        </Col>
        <Col xs={4}>
            {user.exp}XP
        </Col>
    </ListGroupItem>
);

export default UserItem;