import React, { Component } from 'react';
import { Row, Col, ButtonGroup, Image, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import UserPicker from './UserPicker';
import MatchResult from './MatchResult';
import MatchStats from './MatchStats';

const mapStateToProps = state => ({...state});

@connect(mapStateToProps, null)
class FoosballTable extends Component {
    render() {
        const { userList } = this.props;
        const playing = userList.filter(u => u.playing);
        let players = {};
        if (playing) {
            players = {
                redAtt: playing.find(u => u.team === 'red' && u.role === 'att'),
                redDef: playing.find(u => u.team === 'red' && u.role === 'def'),
                blueAtt: playing.find(u => u.team === 'blue' && u.role === 'att'),
                blueDef: playing.find(u => u.team === 'blue' && u.role === 'def'),
            };
        }
             
        return (
        <Well>
            <Row>
                <Col xs={12}><h3>Squad</h3></Col>
                <Col smOffset={3} sm={9} xs={12}>
                    <ButtonGroup justified>
                        <UserPicker team={'blue'} role={'att'} player={players.blueAtt}/>
                        <UserPicker team={'blue'} role={'def'} player={players.blueDef}/>
                    </ButtonGroup>
                </Col>
                <Col xs={12}>
                    <Image src="/src/assets/img/table.jpg" rounded responsive thumbnail />
                </Col>
                <Col sm={9} xs={12}>
                    <ButtonGroup justified>
                        <UserPicker team={'red'} role={'def'} player={players.redDef}/>
                        <UserPicker team={'red'} role={'att'} player={players.redAtt}/>
                    </ButtonGroup>
                </Col>
            </Row>
            <MatchResult />
            { ( playing.length >= 4 ) ? <MatchStats players={players} /> : null }
        </Well>
        );
    }
}

export default FoosballTable;