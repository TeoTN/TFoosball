import React from 'react'
import { ListGroupItem, ListGroup, Row, Col, Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { memberAcceptance } from "../teams.actions";
import { connect } from "react-redux";
import Icon from 'react-fontawesome';
import PanelHeader from "../../shared/PanelHeader";


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

class PendingMemberList extends React.PureComponent {
    render() {
        const {teams: {pending = []}, acceptMember, rejectMember, selectedTeam} = this.props;
        return <React.Fragment>
            <PanelHeader title="Awaiting members" glyph="inbox" isAwesome />
            {
                pending.length > 0 ?
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
                    <h6 className="text-muted">
                        There are no pending members awaiting to join {selectedTeam.name} club.
                    </h6>
            }
        </React.Fragment>
    }
}

export default connect(null, mapDispatchToProps)(PendingMemberList)
