import React from 'react'
import {ListGroupItem, ListGroup, Row, Col, Button, ButtonToolbar, Glyphicon} from 'react-bootstrap';

const PendingMemberList = ({users = [], onAccept, onReject}) => {
    if (!users || users.length === 0) {
        return null;
    }
    return (
        <div>
            <h4>Pending members</h4>
            <ListGroup>
                {
                    users.map(
                        user =>
                            <ListGroupItem key={`${user.username}.${user.id}`}>
                                <Row>
                                    <Col xs={9}>
                                        {user.username} ({user.email})
                                    </Col>
                                    <Col xs={3}>
                                        <ButtonToolbar>
                                            <Button bsStyle="success" bsSize="xsmall" onClick={() => onAccept(user.id)}>
                                                &nbsp;&nbsp;<Glyphicon glyph="ok"/>&nbsp;Accept&nbsp;&nbsp;
                                            </Button>
                                            <Button bsStyle="danger" bsSize="xsmall" onClick={() => onReject(user.id)}>
                                                <Glyphicon glyph="remove"/>
                                            </Button>
                                        </ButtonToolbar>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                    )
                }
            </ListGroup>
        </div>
    );
};

export default PendingMemberList;
