import React, { Component } from 'react';
import { Row, Col, ButtonGroup, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { publish } from '../../matches/match.actions';
import UserPicker from '../../users/components/UserPicker';
import PlayResult from './PlayResult';
import PlayStats from './PlayStats';
import PlayToolbar from './PlayToolbar';
import { choosePlayersForMatch, swapPositions, swapSides } from '../../users/users.actions';
import { raiseError } from '../../shared/notifier.actions';
import table from '../../assets/img/table.jpg';
import { getSelectedTeam } from "../../teams/teams.reducer";
import { getSelectedUsers, getPositions, arePositionsSet } from "../../users/users.reducer";

const mapStateToProps = (state) => {
    const selectedTeam = getSelectedTeam(state.teams);
    return {
        positions: getPositions(state),
        arePositionsSet: arePositionsSet(state),
        selectedUsers: getSelectedUsers(state),
        selectedTeam: selectedTeam ? selectedTeam.name : '',
    };
};

const mapDispatchToProps = (dispatch) => ({
    swapSides: () => dispatch(swapSides()),
    swapPositions: () => dispatch(swapPositions()),
    regenerate: (selectedUsers) => {
        try {
            dispatch(choosePlayersForMatch(selectedUsers))
        }
        catch (err) {
            dispatch(raiseError(err.message));
        }
    },
    publishMatch: (data, callback) => dispatch(publish(data, callback)),
});

@connect(mapStateToProps, mapDispatchToProps)
class FoosballTable extends Component {
    onRegenerate = () => {
        const {regenerate, selectedUsers} = this.props;
        regenerate(selectedUsers);
    };

    render() {
        const {positions, arePositionsSet, swapSides, swapPositions, publishMatch, selectedTeam} = this.props;
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <PlayToolbar onSwapSides={swapSides} onSwapPositions={swapPositions} onRegenerate={this.onRegenerate}/>
                    </Col>
                </Row>
                <Row className="with-vertical-margin">
                    <Col smOffset={3} sm={9} xs={12}>
                        <ButtonGroup justified>
                            <UserPicker team={'blue'} position={'att'}/>
                            <UserPicker team={'blue'} position={'def'}/>
                        </ButtonGroup>
                    </Col>
                    <Col xs={12}>
                        <Image src={table} rounded responsive thumbnail/>
                        <h2 className="team-title">
                            {selectedTeam}
                        </h2>
                    </Col>
                    <Col sm={9} xs={12}>
                        <ButtonGroup justified>
                            <UserPicker team={'red'} position={'def'}/>
                            <UserPicker team={'red'} position={'att'}/>
                        </ButtonGroup>
                    </Col>
                </Row>
                <PlayResult onPublish={publishMatch} players={positions} arePositionsSet={arePositionsSet}/>
                {arePositionsSet ? <PlayStats positions={positions}/> : null}
            </div>
        );
    }
}

export default FoosballTable;