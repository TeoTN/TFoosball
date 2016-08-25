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
        sortByExp: () => dispatch(UserActions.sortByExp()),
        sortByName: () => dispatch(UserActions.sortByName()),
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
                        <Button bsStyle="info" onClick={this.props.sortByName}>Sort by name</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button bsStyle="info" onClick={this.props.sortByExp}>Sort by XP</Button>
                    </ButtonGroup>
                </ButtonGroup>
            </Col>
        );
    }
}

export default MatchToolbar;