import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user.actions';
import * as ErrorActions from '../actions/error.actions';
import { Button, ButtonGroup, Col } from 'react-bootstrap';

const mapStateToProps = state => ({...state});
const mapDispatchToProps = (dispatch, props) => {
    return {
        handlePlay: () => {
            try { dispatch(UserActions.choosePlayersForMatch()) }
            catch(err) { dispatch(ErrorActions.raiseError(err.message)); }
            window.scrollTo(0, 0);
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
            <Col xs={12}>
                <ButtonGroup justified>
                    <ButtonGroup>
                        <Button bsStyle="primary" onClick={this.props.sortByName}>By name</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button bsStyle="primary" onClick={this.props.sortByExp}>By XP</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button bsStyle="success" onClick={this.props.handlePlay}>Play!</Button>
                    </ButtonGroup>
                    {/*TODO Add clear game*/}
                </ButtonGroup>
            </Col>
        );
    }
}

export default MatchToolbar;