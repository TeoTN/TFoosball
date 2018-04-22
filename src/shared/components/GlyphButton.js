import React from 'react'
import { Button, Glyphicon } from "react-bootstrap";
import Icon from 'react-fontawesome';

const GlyphButton = ({glyph, children, awesome, ...props}) => {
    return (
        <Button {...props} className="btn-glyph">
            {
                awesome ?
                    <Icon name={glyph}/> :
                    <Glyphicon glyph={glyph}/>
            }
            {children}
        </Button>
    );
};

export default GlyphButton;
