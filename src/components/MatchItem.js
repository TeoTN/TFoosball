import React from 'react';
import { Row, Col, Glyphicon, Button } from 'react-bootstrap';

const MatchItem = (params) => (
    <Row componentClass="tr">
        <Col xs={4} className="text-danger align-r" componentClass="td">
            {params.red_def}, {params.red_att}
        </Col>
        <Col xs={1} componentClass="td">
            <strong> {params.red_score} - {params.blue_score}</strong>
        </Col>
        <Col xs={4} className="text-info" componentClass="td">
            {params.blue_att}, {params.blue_def}
        </Col>
        <Col xs={1} componentClass="td">
            {Math.abs(params.points)}
        </Col>
        <Col xs={2} componentClass="td">
            <Button bsSize="xs" bsStyle="danger" onClick={params.onRemove(params)}>
                <Glyphicon glyph="trash" />
            </Button>
        </Col>
    </Row>
);

export default MatchItem;
