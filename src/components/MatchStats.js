import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, FormControl } from 'react-bootstrap';

const mapStateToProps = state => ({...state});

@connect(mapStateToProps, null)
class MatchStats extends Component {
    render() {
        return (
        <Row>
            <Col xs={12}>
                <h3>Statistics</h3>
            </Col>
            <Col xs={4}><strong>Max blue pts</strong></Col><Col xs={2}>83</Col>
            <Col xs={4}><strong>Max red pts</strong></Col><Col xs={2}>19</Col>
            <Col xs={4}><strong>Red def</strong></Col><Col xs={2}>TeoTN</Col><Col xs={2}>Def: 67%</Col><Col xs={2}>Att: 31%</Col>
            <Col xs={4}><strong>Red att</strong></Col><Col xs={2}>TeoTN</Col><Col xs={2}>Def: 67%</Col><Col xs={2}>Att: 31%</Col>
            <Col xs={4}><strong>Blue def</strong></Col><Col xs={2}>TeoTN</Col><Col xs={2}>Def: 67%</Col><Col xs={2}>Att: 31%</Col>
            <Col xs={4}><strong>Red att</strong></Col><Col xs={2}>TeoTN</Col><Col xs={2}>Def: 67%</Col><Col xs={2}>Att: 31%</Col>
        </Row>
        );
    }
}

export default MatchStats;