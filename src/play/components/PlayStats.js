import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import Widget from '../../shared/components/Widget';
import { connect } from 'react-redux';
import { raiseError } from '../../shared/error.actions';
import { fetchMatchPoints } from '../../api/connectors';

const mapDispatchToProps = (dispatch) => ({
    raiseError: (msg) => dispatch(raiseError(msg)),
});
@connect(null, mapDispatchToProps)
class PlayStats extends React.Component {
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
            .then(results => this.setState(results))
            .catch(raiseError);
    }

    renderUserStats = (player, index) => (
        <Row key={index}>
            <Col xs={4}>
                { player.username }
            </Col>
            <Col xs={2}>
                <strong className={player.team==='red'?'text-danger':'text-info'}>
                    { player.position.toUpperCase() }
                </strong>
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
                    <Widget label="Max blue XP gain" value={blue}/>
                    <Widget label="Max red XP gain" value={red}/>
                </Row>
                <Panel>
                    { this.getPlayerStats() }
                </Panel>
            </div>
        );
    }
}

export default PlayStats;