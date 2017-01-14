import React from 'react';
import { Panel, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

const mapStateToProps = ({ profile: { matches } }) => ({ matches, });

const Match = ({red_att, red_def, blue_att, blue_def, red_score, blue_score, points}) => (
    <ListGroupItem onClick={()=>{}}>
        <Col xs={5} className="text-danger">
            [Scored&nbsp;{red_score}] {red_def} & {red_att}
        </Col>
        <Col xs={5} className="text-info">
            {blue_att} & {blue_def} [Scored&nbsp;{blue_score}]
        </Col>
        <Col xs={2}>
            {Math.abs(points)}
        </Col>
    </ListGroupItem>
);

const ProfileMatches = ({ matches = [] }) => (
    <Panel>
        <h4>Matches</h4>
        <ListGroup>
            <ListGroupItem onClick={()=>{}}>
                <Col xs={5}>
                    <strong> Red team </strong>
                </Col>
                <Col xs={5}>
                    <strong> Blue team </strong>
                </Col>
                <Col xs={2}>
                    <strong> Points </strong>
                </Col>
            </ListGroupItem>
            { matches.map((match, idx) => <Match key={idx} {...match} />)}
        </ListGroup>
    </Panel>
);
export default connect(mapStateToProps, null)(ProfileMatches);
