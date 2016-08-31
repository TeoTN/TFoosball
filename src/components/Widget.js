import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

export default class Widget extends Component {
    render() {
        return (
            <Panel className="inline-block widget">
                <span className="h6">{this.props.label}</span>
                <h3 className="no-margin">{this.props.value}</h3>
            </Panel>
        );
    }
}