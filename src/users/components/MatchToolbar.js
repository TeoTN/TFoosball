import React from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../users.actions';
import { raiseError } from '../../shared/notifier.actions';
import { Button, ButtonGroup, Col } from 'react-bootstrap';
import { getSelectedUsers, getSorting } from "../users.reducer";

const mapStateToProps = (state) => ({
    selectedUsers: getSelectedUsers(state),
    sorting: getSorting(state),
});
const mapDispatchToProps = (dispatch) => ({
    handlePlay: (selectedUsers) => {
        try {
            dispatch(UserActions.choosePlayersForMatch(selectedUsers))
        }
        catch(err) {
            dispatch(raiseError(err.message));
        }
    },
    sortByExp: (direction) => dispatch(UserActions.sortBy("exp", direction)),
    sortByName: (direction) => dispatch(UserActions.sortBy("username", direction)),
});

class MatchToolbar extends React.PureComponent {
    render() {
        const { sortByName, sortByExp, canPlay, sorting: {isAscendingOrder}, handlePlay, selectedUsers} = this.props;
        return (
            <Col xs={12}>
                <ButtonGroup justified className="ui-card">
                    <ButtonGroup>
                        <Button bsStyle="primary" bsSize="small" onClick={() => sortByName(!isAscendingOrder)}>By name</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button bsStyle="primary" bsSize="small" onClick={() => sortByExp(!isAscendingOrder)}>By XP</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button
                            bsStyle="success"
                            bsSize="small"
                            onClick={() => handlePlay(selectedUsers)}
                            disabled={!canPlay}>
                            Play!
                        </Button>
                    </ButtonGroup>
                </ButtonGroup>
            </Col>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchToolbar);
