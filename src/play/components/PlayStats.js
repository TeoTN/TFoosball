import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import Widget from '../../shared/components/Widget';
import { connect } from 'react-redux';

const mapStateToProps = ({play: {stats}}) => ({
    stats
});

@connect(mapStateToProps, null)
class PlayStats extends React.Component {
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
        const { stats } = this.props;
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <h3>Statistics</h3>
                    </Col>
                    <Widget label="Max blue XP gain" value={stats.blue}/>
                    <Widget label="Max red XP gain" value={stats.red}/>
                </Row>
                <Panel>
                    { this.getPlayerStats() }
                </Panel>
            </div>
        );
    }
}

export default PlayStats;