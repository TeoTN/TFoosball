import React, { Component } from 'react';
import { Row, Col, ButtonGroup, Image, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import UserPicker from './UserPicker';
import MatchResult from './MatchResult';

const mapStateToProps = state => ({...state});

@connect(mapStateToProps, null)
class FoosballTable extends Component {
    render() {
        const players = this.props.userList.filter(user => user.playing);
        return (
            <Col xs={5}>
                <Well>
                    <Row>
                        <h3>Squad</h3>
                        <Col xsOffset={3} xs={9}>
                            <ButtonGroup justified>
                                <UserPicker team={'blue'} pos={'def'} player={players[0]}/>
                                <UserPicker team={'blue'} pos={'att'} player={players[1]}/>
                            </ButtonGroup>
                        </Col>
                        <Image src="/src/assets/img/table.jpg" rounded responsive thumbnail />
                        <Col xs={9}>
                            <ButtonGroup justified>
                                <UserPicker team={'red'} pos={'def'} player={players[2]}/>
                                <UserPicker team={'red'} pos={'att'} player={players[3]}/>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <MatchResult />
                </Well>
            </Col>
        );
    }
}

export default FoosballTable;