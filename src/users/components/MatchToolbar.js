import React from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../users.actions';
import { raiseError } from '../../shared/notifier.actions';
import { Button, ButtonGroup, Col } from 'react-bootstrap';
import { getSelectedUsers } from "../users.reducer";

const mapStateToProps = (state) => ({
    selectedUsers: getSelectedUsers(state),
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

@connect(mapStateToProps, mapDispatchToProps)
class MatchToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortDir: false,
        };
    }

    onPlay = () => {
        const {handlePlay, selectedUsers} = this.props;
        handlePlay(selectedUsers);
    };

    sort = (method) => {
        const { sortDir } = this.state;
        method(sortDir);
        this.setState({sortDir: !sortDir});
    };

    render() {
        const { sortByName, sortByExp, canPlay } = this.props;
        return (
            <Col xs={12}>
                <ButtonGroup justified className="ui-card">
                    <ButtonGroup>
                        <Button bsStyle="primary" bsSize="small" onClick={() => this.sort(sortByName)}>By name</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button bsStyle="primary" bsSize="small" onClick={() => this.sort(sortByExp)}>By XP</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button bsStyle="success" bsSize="small" onClick={this.onPlay} disabled={!canPlay}>Play!</Button>
                    </ButtonGroup>
                </ButtonGroup>
            </Col>
        );
    }
}

export default MatchToolbar;