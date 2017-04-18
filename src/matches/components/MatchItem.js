import React from 'react';
import {Col, Glyphicon, Button, ListGroupItem} from 'react-bootstrap';

const MatchItem = ({match, username, onRemove, withOptions}) => {
    const highlight = (
            match.red_score > match.blue_score &&
            (username === match.red_att || username === match.red_def)
        ) || (
            match.red_score < match.blue_score &&
            (username === match.blue_att || username === match.blue_def)
        );
    return (
        <ListGroupItem bsStyle={highlight ? 'lt-success' : 'default'} listItem>
            { withOptions &&
                <Button bsSize="sm" bsStyle="danger" onClick={onRemove(match)} className="col-options">
                    <Glyphicon glyph="trash"/>
                </Button>
            }
            <Col md={5} xs={4} className="text-danger text-right">
                <span className="h6 with-horizontal-margin">{match.red_def}</span>
                <span className="h6">{match.red_att}</span>
            </Col>
            <Col md={1} xs={2} className="text-center">
                <strong> {match.red_score}&nbsp;-&nbsp;{match.blue_score}</strong>
            </Col>
            <Col md={5} xs={4} className="text-info">
                <span className="h6">{match.blue_att}</span>
                <span className="h6 with-horizontal-margin">{match.blue_def}</span>
            </Col>
            <Col xs={1} className="points">
                {Math.abs(match.points) * (!highlight ? -1 : 1)}
            </Col>
        </ListGroupItem>
    );
};

export default MatchItem;
