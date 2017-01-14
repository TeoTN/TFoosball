import React from 'react';
import { Panel, Col, Table, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import MatchItem from './MatchItem';

const mapStateToProps = ({ profile: { matches } }) => ({ matches, });

const ProfileMatches = ({ matches = [] }) => (
    <Panel>
        <h4>Matches</h4>
        <Table striped hover>
            <thead>
                <Row componentClass="tr">
                    <Col xs={4} className="align-r" componentClass="td">
                        <strong> Red team </strong>
                    </Col>
                    <Col xs={1} componentClass="td">
                        <strong> Score </strong>
                    </Col>
                    <Col xs={4} componentClass="td">
                        <strong> Blue team </strong>
                    </Col>
                    <Col xs={1} componentClass="td">
                        <strong> EXP </strong>
                    </Col>
                    <Col xs={2} componentClass="td">
                        <strong> Options </strong>
                    </Col>
                </Row>
            </thead>
            <tbody>
                { matches.map((match, idx) => <MatchItem key={idx} {...match} />)}
            </tbody>
        </Table>
    </Panel>
);

export default connect(mapStateToProps, null)(ProfileMatches);
