import React from 'react'
import {ListGroupItem, ListGroup, Row, Col, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';

const PendingMemberItem = ({user, onAccept, onReject}) => (
    <ListGroupItem key={`${user.username}.${user.id}`}>
        <Row>
            <Col xs={8} md={10} className="text-ellipsis">
                {user.username} ({user.email})
            </Col>
            <Col xs={4} md={2}>
                <ButtonGroup className="pull-right">
                    <Button bsStyle="danger" bsSize="xsmall" onClick={() => onReject(user.id)}>
                        <Glyphicon glyph="remove"/>
                    </Button>
                    <Button bsStyle="success" bsSize="xsmall" onClick={() => onAccept(user.id)}>
                        <Glyphicon glyph="ok"/><span className="hidden-xs">&nbsp;Accept</span>
                    </Button>
                </ButtonGroup>
            </Col>
        </Row>
    </ListGroupItem>
);

const PendingMemberList = ({users = [], onAccept, onReject}) => (
    <ListGroup>
        { users.map(user => <PendingMemberItem key={user.username} user={user} onAccept={onAccept} onReject={onReject} />) }
    </ListGroup>
);

export default PendingMemberList;
