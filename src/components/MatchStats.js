import React, { Component } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import Widget from './Widget';
import { connect } from 'react-redux';
import { raiseError } from '../actions/error.actions';
import { fetchMatchPoints } from '../api/connectors';
import { ensureJSON, ensureSuccessOr } from '../api/helpers';

const mapDispatchToProps = (dispatch) => ({
    raiseError: (msg) => dispatch(raiseError(msg)),
});
@connect(null, mapDispatchToProps)
class MatchStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            red: 0,
            blue: 0,
        };
    }
    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        const { players, raiseError } = this.props;
        const data = players.reduce(
            (data, player) => Object.assign(data, {[`${player.team}_${player.position}`]: player.id}),
            {}
        );
        fetchMatchPoints(data)
            .then(ensureSuccessOr('Failed to fetch match statistics'))
            .then(ensureJSON)
            .then(results => this.setState(results))
            .catch(raiseError);
    }

    renderUserStats = (player, index) => (
        <Row key={index}>
            <Col xs={3}>
                <strong>{ player.team.toUpperCase() } { player.position.toUpperCase() }</strong>
            </Col>
            <Col xs={3}>
                { player.username }
            </Col>
            <Col xs={2}>
                <span><strong>Def:</strong>&nbsp;{ Math.round(player.def_ratio*100) }%</span>
            </Col>
            <Col xs={2}>
                <span><strong>Att:</strong>&nbsp;{ Math.round(player.att_ratio*100) }%</span>
            </Col>
        </Row>
    );

    getPlayerStats = () => this.props.players.map(this.renderUserStats);

    render() {
        const { blue, red } = this.state;
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <h3>Statistics</h3>
                    </Col>
                    <Widget label="Max blue pts" value={blue}/>
                    <Widget label="Max red pts" value={red}/>
                </Row>
                <Panel>
                    { this.getPlayerStats() }
                </Panel>
            </div>
        );
    }
}

export default MatchStats;