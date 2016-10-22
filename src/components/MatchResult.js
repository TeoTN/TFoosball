import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as MatchActions from '../actions/match.actions';
import * as ErrorActions from '../actions/error.actions';
import { Button, Row, Col, FormControl } from 'react-bootstrap';
import { publishMatch } from '../api/connectors';
import { ensureJSON, ensureSuccessOr } from '../api/helpers';

const mapStateToProps = state => ({...state});
const mapDispatchToProps = (dispatch) => {
    return {
        sendResults: (response) => dispatch(MatchActions.send(response)),
        handleFailure: (error) => {
            console.error(error);
            dispatch(ErrorActions.raiseError('Failed to send match to server.'));
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
class MatchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blue: 0,
            red: 0,
        };
    }

    onInputChange = (team) => (event) => this.setState({ [team]: event.target.value });

    handleFinish = () => {
        const { sendResults, handleFailure, users } = this.props;
        const players = users.filter(u => u.playing);
        const requestData = {
            red_att: players.find(u => u.team === 'red' && u.position === 'att').id,
            red_def: players.find(u => u.team === 'red' && u.position === 'def').id,
            blue_att: players.find(u => u.team === 'blue' && u.position === 'att').id,
            blue_def: players.find(u => u.team === 'blue' && u.position === 'def').id,
            red_score: this.state.red,
            blue_score: this.state.blue,
        };
        publishMatch(requestData)
            .then(ensureSuccessOr('Failed to publish match results'))
            .then(ensureJSON)
            .then(sendResults)
            .catch(handleFailure);
    };

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
                    onChange={this.onInputChange('blue')}
                />
            </Col>
            <Col xsHidden sm={1}>
                <h4>vs</h4>
            </Col>
            <Col sm={4}>
                <FormControl
                    type="text"
                    placeholder="Red"
                    onChange={this.onInputChange('red')}
                />
            </Col>
            <Col sm={3}>
                <Button onClick={this.handleFinish} bsStyle={'success'} block>
                    Send
                </Button>
            </Col>
        </Row>
        );
    }
}

export default MatchResult;