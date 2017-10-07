import React from 'react';
import { connect } from 'react-redux';
import * as UserActions from '../user.actions';
import { raiseError } from '../../shared/notifier.actions';
import { Button, ButtonGroup, Col } from 'react-bootstrap';

const mapDispatchToProps = (dispatch) => ({
    handlePlay: () => {
        try {
            dispatch(UserActions.choosePlayersForMatch())
        }
        catch(err) {
            dispatch(raiseError(err.message));
        }
        window.scrollTo(0, 0);
    },
    sortByExp: (direction) => dispatch(UserActions.sortBy("exp", direction)),
    sortByName: (direction) => dispatch(UserActions.sortBy("username", direction)),
});

@connect(null, mapDispatchToProps)
class MatchToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortDir: false,
        };
    }

    sort = (method) => {
        const { sortDir } = this.state;
        method(sortDir);
        this.setState({sortDir: !sortDir});
    };

    render() {
        const { sortByName, sortByExp, handlePlay, canPlay } = this.props;
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
                        <Button bsStyle="success" bsSize="small" onClick={handlePlay} disabled={!canPlay}>Play!</Button>
                    </ButtonGroup>
                </ButtonGroup>
            </Col>
        );
    }
}

export default MatchToolbar;