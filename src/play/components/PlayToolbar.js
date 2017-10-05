import React from 'react'
import {ButtonGroup, Button, Glyphicon} from 'react-bootstrap';

const PlayToolbar = ({ onSwapSides, onSwapPositions, onRegenerate }) => {
    return (
        <ButtonGroup className="ui-card" justified>
            <ButtonGroup>
                <Button bsStyle="primary" bsSize="small" onClick={onSwapSides}>
                    <Glyphicon glyph="refresh"/>&nbsp;Sides
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button bsStyle="primary" bsSize="small" onClick={onSwapPositions}>
                    <Glyphicon glyph="resize-horizontal"/>&nbsp;Positions
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button bsStyle="success" bsSize="small" onClick={onRegenerate}>
                    <Glyphicon glyph="repeat"/>&nbsp;Regenerate
                </Button>
            </ButtonGroup>
        </ButtonGroup>
    );
};

export default PlayToolbar;
