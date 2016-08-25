import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as MatchActions from '../actions/match.actions';
import * as ErrorActions from '../actions/error.actions';
import { Button, Row } from 'react-bootstrap';

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
                <h3>Result</h3>
                <Button onClick={this.props.handleFinish({})} bsStyle={'danger'}>Send</Button>
            </Row>
        );
    }
}

export default MatchResult;