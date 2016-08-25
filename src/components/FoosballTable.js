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
        const redAtt = userList.find(u => u.playing && u.team === 'red' && u.role === 'att'),
              redDef = userList.find(u => u.playing && u.team === 'red' && u.role === 'def'),
              blueAtt = userList.find(u => u.playing && u.team === 'blue' && u.role === 'att'),
              blueDef = userList.find(u => u.playing && u.team === 'blue' && u.role === 'def');
        return (
        <Well>
            <Row>
                <Col xs={12}><h3>Squad</h3></Col>
                <Col smOffset={3} sm={9} xs={12}>
                    <ButtonGroup justified>
                        <UserPicker team={'blue'} role={'att'} player={blueAtt}/>
                        <UserPicker team={'blue'} role={'def'} player={blueDef}/>
                    </ButtonGroup>
                </Col>
                <Col xs={12}>
                    <Image src="/src/assets/img/table.jpg" rounded responsive thumbnail />
                </Col>
                <Col sm={9} xs={12}>
                    <ButtonGroup justified>
                        <UserPicker team={'red'} role={'def'} player={redDef}/>
                        <UserPicker team={'red'} role={'att'} player={redAtt}/>
                    </ButtonGroup>
                </Col>
            </Row>
            <MatchResult />
            <MatchStats />
        </Well>
        );
    }
}

export default FoosballTable;