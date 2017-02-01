import React, { Component } from 'react';
import { Panel, Col } from 'react-bootstrap';

export default class Widget extends Component {
    render() {
        return (
            <Col xs={12} md={6}>
                <Panel className="inline-block widget">
                    <span className="h6">{this.props.label}</span>
                    <h3 className="no-margin">{this.props.value}</h3>
                </Panel>
            </Col>
        );
    }
}