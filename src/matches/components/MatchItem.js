import React from 'react';
import {Col, Glyphicon, Button, ListGroupItem} from 'react-bootstrap';
import Icon from 'react-fontawesome';


const MatchItem = ({match, username, onRemove, withOptions, signed}) => {
    const highlight = (
            match.red_score > match.blue_score &&
            (username === match.red_att || username === match.red_def)
        ) || (
            match.red_score < match.blue_score &&
            (username === match.blue_att || username === match.blue_def)
        );
    return (
        <ListGroupItem style={{padding: '5px'}} listItem>
            { withOptions &&
            <Button bsSize="xsmall"  bsStyle="danger" onClick={onRemove(match)} className="col-options">
                <Glyphicon glyph="trash"/>
            </Button>
            }
            <Col xs={8} className="visible-xs">
                <h6 className="text-danger">{match.red_def}&nbsp;[D], {match.red_att}&nbsp;[A]</h6>
                <h6 className="text-info">{match.blue_def}&nbsp;[D], {match.blue_att}&nbsp;[A]</h6>
            </Col>
            <Col sm={5} xsHidden>
                <h6 className="text-danger text-right h6-large">{match.red_def} [D], {match.red_att} [A]</h6>
            </Col>
            <Col xs={4} sm={2}>
                <h4 className="text-center">
                    <span className="text-danger">{match.red_score}</span>
                    &nbsp;-&nbsp;
                    <span className="text-info">{match.blue_score}</span><br/>
                    <small>
                        {Math.abs(match.points) * (!highlight && signed ? -1 : 1)}xp&nbsp;
                        { highlight && <Icon name="trophy" className="text-warning" title="Won match" /> }
                    </small>
                </h4>
            </Col>
            <Col sm={5} xsHidden>
                <h6 className="text-info h6-large">{match.blue_def} [D], {match.blue_att} [A]</h6>
            </Col>
        </ListGroupItem>
    );
};

export default MatchItem;
