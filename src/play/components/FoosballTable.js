import React, { Component } from 'react';
import {Row, Col, ButtonGroup, Image} from 'react-bootstrap';
import { connect } from 'react-redux';
import { publish } from '../../matches/match.actions';
import UserPicker from '../../users/components/UserPicker';
import PlayResult from './PlayResult';
import PlayStats from './PlayStats';
import PlayToolbar from './PlayToolbar';
import { choosePlayersForMatch, swapPositions, swapSides } from '../../users/user.actions';
import { raiseError } from '../../shared/notifier.actions';
import table from '../../assets/img/table.jpg';
import {getSelectedTeam} from "../../teams/teams.reducer";

const mapStateToProps = ({users, teams}) => ({
    users,
    selectedTeam: getSelectedTeam(teams).name,
});
const mapDispatchToProps = (dispatch) => ({
    swapSides: () => dispatch(swapSides()),
    swapPositions: () => dispatch(swapPositions()),
    regenerate: () => {
        try { dispatch(choosePlayersForMatch()) }
        catch(err) { dispatch(raiseError(err.message)); }
    },
    publishMatch: (data, callback) => dispatch(publish(data, callback)),
});

@connect(mapStateToProps, mapDispatchToProps)
class FoosballTable extends Component {
    render() {
        const { users, swapSides, swapPositions, regenerate, publishMatch } = this.props;
        const playing = users.filter(u => u.playing);

        return (
        <div>
            <Row>
                <Col xs={12}>
                    <PlayToolbar onSwapSides={swapSides} onSwapPositions={swapPositions} onRegenerate={regenerate} />
                </Col>
            </Row>
            <Row className="with-vertical-margin">
                <Col smOffset={3} sm={9} xs={12}>
                    <ButtonGroup justified>
                        <UserPicker team={'blue'} position={'att'} />
                        <UserPicker team={'blue'} position={'def'} />
                    </ButtonGroup>
                </Col>
                <Col xs={12}>
                    <Image src={table} rounded responsive thumbnail />
                    <h2 className="team-title">
                        {this.props.selectedTeam}
                    </h2>
                </Col>
                <Col sm={9} xs={12}>
                    <ButtonGroup justified>
                        <UserPicker team={'red'} position={'def'} />
                        <UserPicker team={'red'} position={'att'} />
                    </ButtonGroup>
                </Col>
            </Row>
            <PlayResult onPublish={publishMatch} players={playing} />
            { playing.length === 4 ? <PlayStats players={ playing } /> : null }
        </div>
        );
    }
}

export default FoosballTable;