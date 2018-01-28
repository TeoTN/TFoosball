import React from 'react'
import { ButtonToolbar, Col, Row, Glyphicon, Clearfix } from "react-bootstrap";
import Icon from 'react-fontawesome';

const PanelHeader = ({children, title, glyph, isAwesome}) => {
    return (
        <Row>
            <Col xs={12} md={4}>
                <h4>
                    {
                        isAwesome ?
                            <Icon name={glyph}/> :
                            <Glyphicon glyph={glyph}/>
                    }
                    {title}
                </h4>
            </Col>
            {children && <Col xs={12} md={8}>
                <ButtonToolbar className="pull-right">
                    {children}
                </ButtonToolbar>
            </Col>}
            <Clearfix />
            <hr/>
        </Row>
    );
};

export default PanelHeader;
