import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as MatchActions from '../actions/match.actions';
import * as ErrorActions from '../actions/error.actions';
import { Button, Row, Col, FormControl } from 'react-bootstrap';

const mapStateToProps = state => ({...state});
const mapDispatchToProps = (dispatch, props) => {
    return {
        handleFinish: (result) => dispatch(MatchActions.finish(props)),
    }
};

@connect(mapStateToProps, mapDispatchToProps)
class MatchResult extends Component {
    render() {
        return (
        <Row>
            <Col xs={12}>
                <h3>Score</h3>
            </Col>
            <Col sm={4}>
                <FormControl
                    type="text"
                    placeholder="Blue"
                />
            </Col>
            <Col xsHidden sm={1}>
                <h4>vs</h4>
            </Col>
            <Col sm={4}>
                <FormControl
                    type="text"
                    placeholder="Red"
                />
            </Col>
            <Col sm={3}>
                <Button onClick={this.props.handleFinish} bsStyle={'success'} block>
                    Send
                </Button>
            </Col>
        </Row>
        );
    }
}

export default MatchResult;