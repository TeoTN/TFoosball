import React, { Component } from 'react';
import { Panel, Row, Col } from 'react-bootstrap';

export default class TournamentMatch extends Component {
    render() {
        const {blue, red, pts, result} = this.props.data;
        return (
            <Panel style={{ 'min-height': '100px'}}>
                <span className="text-primary h4">{pts}</span>
                <Row>
                    <Col xs={9}>
                        <span className="text-danger">{red[0]}, {red[1]}</span>
                    </Col>
                    <Col xs={2}>
                        <span className="text-warning">{result.red}</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={9}>
                        <span className="text-info">{blue[0]}, {blue[1]}</span>
                    </Col>
                    <Col xs={2}>
                        <span className="text-warning">
                            {result.blue}
                            </span>
                    </Col>
                </Row>

            </Panel>
        );
    }
}