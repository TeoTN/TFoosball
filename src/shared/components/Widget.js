import React from 'react';
import { Panel, Col } from 'react-bootstrap';


const Widget = ({label, value, altValue, bsStyle}) => (
    <Col xs={12} md={6}>
        <Panel className={`inline-block text-center widget ${bsStyle ? `text-${bsStyle}` : ''}`}>
            <h1 className="no-margin">
                {value}
                { altValue ?
                    <small>&nbsp;/&nbsp;{altValue}</small> :
                    null
                }
            </h1>
            <span className="h6">{label}</span>
        </Panel>
    </Col>
);

export default Widget;
