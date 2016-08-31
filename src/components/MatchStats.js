import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Panel } from 'react-bootstrap';
import Widget from './Widget';

const mapStateToProps = state => ({...state});

@connect(mapStateToProps, null)
class MatchStats extends Component {
    getPlayerStats() {
        return Object.entries(this.props.players).map(([position, player], index) => (
        <Row key={index}>
            <Col xs={2}>
                <strong>{ position }</strong>
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
                <Widget label="Max blue pts" value={87}/>
                <Widget label="Max red pts" value={31}/>
            </Row>
            <Panel>
                { this.getPlayerStats() }
            </Panel>
        </div>
        );
    }
}

export default MatchStats;