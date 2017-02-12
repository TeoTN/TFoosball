import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../user.actions';
import { raiseError } from '../../shared/notifier.actions';
import { Button, ButtonGroup, Col } from 'react-bootstrap';

const mapStateToProps = state => ({...state});
const mapDispatchToProps = (dispatch) => ({
    handlePlay: () => {
        try { dispatch(UserActions.choosePlayersForMatch()) }
        catch(err) { dispatch(raiseError(err.message)); }
        window.scrollTo(0, 0);
    },
    raiseError: (msg) => dispatch(raiseError(msg)),
    sortByExp: () => dispatch(UserActions.sortBy("exp", false)),
    sortByName: () => dispatch(UserActions.sortBy("username")),
});

@connect(mapStateToProps, mapDispatchToProps)
class MatchToolbar extends Component {
    render() {
        const { sortByName, sortByExp, handlePlay } = this.props;
        return (
            <Col xs={12}>
                <ButtonGroup justified>
                    <ButtonGroup>
                        <Button bsStyle="primary" onClick={sortByName}>By name</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button bsStyle="primary" onClick={sortByExp}>By XP</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button bsStyle="success" onClick={handlePlay}>Play!</Button>
                    </ButtonGroup>
                </ButtonGroup>
            </Col>
        );
    }
}

export default MatchToolbar;