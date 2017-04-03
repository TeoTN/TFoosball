import React from 'react';
import { Row, Col, Glyphicon, Button } from 'react-bootstrap';

const MatchItem = (params) => {
    const highlight = (
        params.red_score > params.blue_score &&
        (params.username === params.red_att || params.username === params.red_def)
    ) || (
        params.red_score < params.blue_score &&
        (params.username === params.blue_att || params.username === params.blue_def)
    );
    return (
        <Row componentClass="tr" className={highlight ? 'selected' : 'default'}>
            <Col xs={4} className="text-danger text-right" componentClass="td">
                {params.red_def}, {params.red_att}
            </Col>
            <Col xs={1} componentClass="td">
                <strong> {params.red_score} - {params.blue_score}</strong>
            </Col>
            <Col xs={4} className="text-info" componentClass="td">
                {params.blue_att}, {params.blue_def}
            </Col>
            <Col xs={1} componentClass="td" className="points">
                {Math.abs(params.points) * (!highlight && params.withOptions ? -1 : 1)}
            </Col>
            { params.withOptions ?
                <Col xs={2} componentClass="td">
                    <Button bsSize="xs" bsStyle="danger" onClick={params.onRemove(params)}>
                        <Glyphicon glyph="trash"/>
                    </Button>
                </Col> :
                null
            }
        </Row>
    );
};

export default MatchItem;
