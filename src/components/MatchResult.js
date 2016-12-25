import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as MatchActions from '../actions/match.actions';
import * as UsersActions from '../actions/user.actions';
import * as ErrorActions from '../actions/error.actions';
import * as InfoBarActions from '../actions/infobar.actions';
import { Button, Row, Col, FormControl } from 'react-bootstrap';
import { publishMatch, fetchUsers } from '../api/connectors';

const mapStateToProps = state => ({...state});
const mapDispatchToProps = (dispatch) => {
    return {
        sendResults: (response) => dispatch(MatchActions.send(response)),
        receiveUsers: (response) => dispatch(UsersActions.receiveUsers(response)),
        handleFailure: (error) => {
            console.error(error);
            dispatch(ErrorActions.raiseError('Failed to send match to server.'));
        },
        displayInfo: (msg) => {
            dispatch(InfoBarActions.displayInfo(msg));
        },
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
        const { sendResults, handleFailure, displayInfo, users, receiveUsers } = this.props;
        const players = users.filter(u => u.playing);
        const requestData = {
            red_att: players.find(u => u.team === 'red' && u.position === 'att').id,
            red_def: players.find(u => u.team === 'red' && u.position === 'def').id,
            blue_att: players.find(u => u.team === 'blue' && u.position === 'att').id,
            blue_def: players.find(u => u.team === 'blue' && u.position === 'def').id,
            red_score: this.state.red,
            blue_score: this.state.blue,
        };
        const success_msg = points => `Match successfully saved. Red: ${points}, blue: ${-points}`;

        publishMatch(requestData)
            .then(sendResults)
            .then(({response: {points}}) => displayInfo(success_msg(points)))
            .then(fetchUsers)
            .then(receiveUsers)
            .catch(handleFailure)
            .then(this.clear);
    };

    clear = () => this.setState({ blue: 0, red: 0, });

    render() {
        return (
        <Row>
            <Col xs={12}>
                <h3>Score</h3>
            </Col>
            <Col sm={4}>
                <FormControl
                    style={{ borderColor: '#3498db' }}
                    type="text"
                    placeholder="Blue"
                    onChange={this.onInputChange('blue')}
                    value={this.state.blue}
                />
            </Col>
            <Col xsHidden sm={1}>
                <h4>vs</h4>
            </Col>
            <Col sm={4}>
                <FormControl
                    style={{ borderColor: '#e74c3c' }}
                    type="text"
                    placeholder="Red"
                    onChange={this.onInputChange('red')}
                    value={this.state.red}
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