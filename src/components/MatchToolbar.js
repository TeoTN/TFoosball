import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user.actions';
import * as ErrorActions from '../actions/error.actions';
import { Button, ButtonGroup, Col } from 'react-bootstrap';

const mapStateToProps = state => ({...state});
const mapDispatchToProps = (dispatch, props) => {
    return {
        handleNewUser: () => dispatch(UserActions.userNew("dummy")),
        handlePlay: () => {
            try { dispatch(UserActions.choosePlayersForMatch()) }
            catch(err) { dispatch(ErrorActions.raiseError(err.message)); }
        },
        raiseError: (msg) => dispatch(ErrorActions.raiseError(msg)),
        handleSorting: () => dispatch(UserActions.sort()),
    }
};

@connect(mapStateToProps, mapDispatchToProps)
class MatchToolbar extends Component {
    render() {
        return (
            <Col xs={4}>
                <ButtonGroup justified>
                    <ButtonGroup>
                        <Button bsStyle="primary" onClick={this.props.handlePlay}>Play!</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button bsStyle="success" onClick={this.props.handleNewUser}>New user</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button bsStyle="info" onClick={this.props.handleSorting}>Sort by XP</Button>
                    </ButtonGroup>
                </ButtonGroup>
            </Col>
        );
    }
}

export default MatchToolbar;