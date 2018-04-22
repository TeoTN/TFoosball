import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import Widget from '../../shared/components/Widget';
import { connect } from 'react-redux';

const mapStateToProps = ({play: {stats}}) => ({
    stats
});

class PlayStats extends React.PureComponent {
    renderUserStats = (player, team, position) => (
        player && 
        <Row key={`stats-${team}-${position}`}>
            <Col xs={4} className='text-ellipsis'>
                { player.username }
            </Col>
            <Col xs={2}>
                <strong className={team==='red'?'text-danger':'text-info'}>
                    { position.toUpperCase() }
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

    getPlayerStats = () => {
        const {players} = this.props;
        return (
            <Panel>
                {this.renderUserStats(players.red_att, 'red', 'att')}
                {this.renderUserStats(players.red_def, 'red', 'def')}
                {this.renderUserStats(players.blue_att, 'blue', 'att')}
                {this.renderUserStats(players.blue_def, 'blue', 'def')}
            </Panel>
        );
    };

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
                { this.getPlayerStats() }
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(PlayStats)
