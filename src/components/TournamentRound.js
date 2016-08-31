import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import TournamentMatch from './TournamentMatch';

export default class TournamentRound extends Component {
    getMatches() {
        const { roundNo } = this.props;
        const pad = Math.pow(2, roundNo)  * 120 - 120;
        return this.props.data.matches.map(
            (match, index) =>
                <Row key={index} style={{ 'paddingTop': `${pad}px` }}>
                    <Col xs={12}>
                        <TournamentMatch data={match}/>
                    </Col>
                </Row>
        );
    }
    render() {
        return (
            <div>
                {this.getMatches()}
            </div>
        );
    }
}