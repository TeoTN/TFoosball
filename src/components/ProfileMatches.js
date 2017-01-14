import React from 'react';
import { Panel, Col, ListGroupItem, ListGroup, Glyphicon, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = ({ profile: { matches } }) => ({ matches, });

const Match = ({red_att, red_def, blue_att, blue_def, red_score, blue_score, points}) => (
    <ListGroupItem onClick={()=>{}}>
        <Col xs={4} className="text-danger align-r">
            {red_def}, {red_att}
        </Col>
        <Col xs={1}>
            <strong> {red_score} - {blue_score}</strong>
        </Col>
        <Col xs={4} className="text-info">
            {blue_att}, {blue_def}
        </Col>
        <Col xs={1}>
            {Math.abs(points)}
        </Col>
        <Col xs={2}>
            <Button bsSize="xs" bsStyle="danger">
                <Glyphicon glyph="trash"/>
            </Button>
        </Col>
    </ListGroupItem>
);

const ProfileMatches = ({ matches = [] }) => (
    <Panel>
        <h4>Matches</h4>
        <ListGroup>
            <ListGroupItem onClick={()=>{}}>
                <Col xs={4} className="align-r">
                    <strong> Red team </strong>
                </Col>
                <Col xs={1}>
                    <strong> Score </strong>
                </Col>
                <Col xs={4}>
                    <strong> Blue team </strong>
                </Col>
                <Col xs={1}>
                    <strong> EXP </strong>
                </Col>
                <Col xs={2}>
                    <strong> Options </strong>
                </Col>
            </ListGroupItem>
            { matches.map((match, idx) => <Match key={idx} {...match} />)}
        </ListGroup>
    </Panel>
);
export default connect(mapStateToProps, null)(ProfileMatches);
