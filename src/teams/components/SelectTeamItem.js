import React from 'react'
import { ListGroupItem, Row, Col } from 'react-bootstrap';
import Icon from 'react-fontawesome';

const SelectTeamItem = ({team, onSelect, selected, editable}) => {
    const {name, username} = team;
    return (
        <ListGroupItem onClick={(...args) => !selected ? onSelect(args) : null} disabled={selected}>
            {/*<span className="pull-left">{name}</span>*/}
            <Row>
                <Col xs={5} className="text-ellipsis">{name}</Col>
                <Col xs={5} sm={6} className="text-ellipsis">{username}</Col>
                <Col xs={2} sm={1}>
                    <Icon
                        name={ editable ? "sign-out" : "chevron-right" }
                        className={`pull-right ${ editable ? "text-danger" : "text-muted"}`}
                        style={{paddingTop: '5px'}} />
                </Col>
            </Row>
        </ListGroupItem>
    );
};

export default SelectTeamItem;
