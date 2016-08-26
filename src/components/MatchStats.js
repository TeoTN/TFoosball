import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, FormControl } from 'react-bootstrap';

const mapStateToProps = state => ({...state});

@connect(mapStateToProps, null)
class MatchStats extends Component {
    getPlayerStats() {
        return Object.entries(this.props.players).map(([role, player], index) => (
        <Row key={index}>
            <Col xs={2}>
                <strong>{ role }</strong>
            </Col>
            <Col xs={3}>
                { player.username }
            </Col>
            <Col xs={2}>
                <span><strong>Def:</strong>&nbsp;{ Math.round(player.def*100) }%</span>
            </Col>
            <Col xs={2}>
                <span><strong>Att:</strong>&nbsp;{ Math.round(player.att*100) }%</span>
            </Col>
        </Row>
        ));
    }
    render() {
        return (
        <div>
            <Row>
                <Col xs={12}>
                    <h3>Statistics</h3>
                </Col>
                <Col xs={4}>
                    <strong className="h4">Max blue pts</strong>
                </Col>
                <Col xs={2}>
                    <span className="h4">83</span>
                </Col>
                <Col xs={4}>
                    <strong className="h4">Max red pts</strong>
                </Col>
                <Col xs={2}>
                    <span className="h4">31</span>
                </Col>
            </Row>
            <div style={{'border': '1px solid #999', 'border-radius': '4px', 'margin': '5px 0', 'padding': '10px'}}>
                { this.getPlayerStats() }
            </div>
        </div>
        );
    }
}

export default MatchStats;