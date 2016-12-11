import React, { Component } from 'react';
import { Row, Col, ButtonGroup, Image, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import UserPicker from './UserPicker';
import MatchResult from './MatchResult';
import MatchStats from './MatchStats';
import table from '../assets/img/table.jpg';

const mapStateToProps = state => ({...state});

@connect(mapStateToProps, null)
class FoosballTable extends Component {
    render() {
        const { users } = this.props;
        const playing = users.filter(u => u.playing);

        return (
        <Well>
            <Row>
                <Col xs={12}><h3>Squad</h3></Col>
                <Col smOffset={3} sm={9} xs={12}>
                    <ButtonGroup justified>
                        <UserPicker team={'blue'} position={'att'} />
                        <UserPicker team={'blue'} position={'def'} />
                    </ButtonGroup>
                </Col>
                <Col xs={12}>
                    <Image src={table} rounded responsive thumbnail />
                </Col>
                <Col sm={9} xs={12}>
                    <ButtonGroup justified>
                        <UserPicker team={'red'} position={'def'} />
                        <UserPicker team={'red'} position={'att'} />
                    </ButtonGroup>
                </Col>
            </Row>
            <MatchResult />
            { playing.length === 4 ? <MatchStats players={ playing } /> : null }
        </Well>
        );
    }
}

export default FoosballTable;