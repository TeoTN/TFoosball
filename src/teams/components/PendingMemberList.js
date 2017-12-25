import React from 'react'
import { ListGroupItem, ListGroup, Row, Col, Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { memberAcceptance } from "../teams.actions";
import { connect } from "react-redux";

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

const mapDispatchToProps = (dispatch) => ({
    acceptMember: (id) => dispatch(memberAcceptance(id, true)),
    rejectMember: (id) => dispatch(memberAcceptance(id, false)),
});

@connect(null, mapDispatchToProps)
export default class PendingMemberList extends React.PureComponent {
    render() {
        const {teams: {pending = []}, acceptMember, rejectMember} = this.props;
        return pending.length > 0 ?
            <ListGroup>
                {
                    pending.map(user => <PendingMemberItem
                        key={user.username}
                        user={user}
                        onAccept={acceptMember}
                        onReject={rejectMember}
                    />)
                }
            </ListGroup> :
            <h6 className="text-muted">There are no pending club members</h6>
    }
}
