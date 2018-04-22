import React from 'react'
import { connect } from "react-redux";
import { Col, Row, Table } from 'react-bootstrap';
import { JoinTeamForm, SelectTeamItem, CreateTeamForm } from './index';
import * as teamsActions from "../teams.actions";
import { showQuestionModal } from "../../shared/modal.actions";
import { GlyphButton, PanelHeader } from "../../shared/components";
import { getAutocompletionState, getDefaultTeamId, getJoinedTeams, getSelectedTeam } from "../teams.reducer";
import EventFeed from "./EventFeed";


const mapStateToProps = (state) => ({
    autocompletion: getAutocompletionState(state),
    joined: getJoinedTeams(state),
    selectedTeam: getSelectedTeam(state),
    defaultTeam: getDefaultTeamId(state),
});

const mapDispatchToProps = (dispatch) => ({
    selectTeam: (team) => dispatch(teamsActions.selectTeam(team)),
    leaveTeam: (team) => dispatch(teamsActions.leaveTeam(team)),
    showModal: (modalParams) => dispatch(showQuestionModal(modalParams)),
    makeDefault: (team) => dispatch(teamsActions.changeDefault(team.id)),
    createTeam: (team, username) => dispatch(teamsActions.requestCreateTeam(team, username)),
    joinTeam: ({name: {value}, username}) => dispatch(teamsActions.requestJoinTeam(value, username)),
    fetchAutocompletion: (input) => {
        dispatch(teamsActions.fetchAutocompletion(input));
        return input;
    },
});

class TeamList extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            joining: false,
            adding: false,
        };
    }

    leaveTeam = (team) => {
        const {showModal, leaveTeam} = this.props;
        showModal({
            title: 'Are you sure?',
            text: `You are about to leave team ${team.name}. Proceed?`,
            onAccept: () => leaveTeam(team),
            onReject: () => {
            },
        });
    };

    makeTeamDefault = (team) => {
        const {showModal, makeDefault} = this.props;
        showModal({
            title: 'Default club',
            text: (
                <span>
                    This will make `{team.name}` your default club.
                    It will be selected when you login to the page.<br/><br/>
                    Do you want to proceed?
                </span>
            ),
            onAccept: () => makeDefault(team),
            onReject: () => {
            },
        });
    };

    onJoin = () => {
        const {joining, adding} = this.state;
        this.setState({joining: !joining, adding: !joining ? false : adding});
    };

    onAdd = () => {
        const {joining, adding} = this.state;
        this.setState({adding: !adding, joining: !adding ? false : joining});
    };

    render() {
        const {
            joined, selectedTeam, defaultTeam, createTeam, joinTeam, selectTeam, autocompletion, fetchAutocompletion
        } = this.props;
        const {joining, adding} = this.state;
        return (
            <React.Fragment>
                <PanelHeader title="Clubs dashboard" glyph="users" isAwesome>
                    <GlyphButton bsStyle="success" bsSize="small" glyph="plus" onClick={this.onAdd}>
                        Create a club
                    </GlyphButton>
                    <GlyphButton bsStyle="success" bsSize="small" glyph="log-in" onClick={this.onJoin}>
                        Join a club
                    </GlyphButton>
                </PanelHeader>
                <Row>
                    <Col xs={12} sm={12} md={9}>
                        <Table hover>
                            <thead>
                            <tr className="club-item">
                                <th scope='col'>Club name</th>
                                <th scope='col'>Nickname</th>
                                <th scope='col'>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                joined.map((team) =>
                                    <SelectTeamItem
                                        key={team.id}
                                        team={team}
                                        onSelect={selectTeam}
                                        onLeave={this.leaveTeam}
                                        onMakeDefault={this.makeTeamDefault}
                                        isSelected={selectedTeam.id === team.id}
                                        isDefault={defaultTeam === team.id}
                                    />
                                )
                            }
                            </tbody>
                        </Table>
                        {joining && <JoinTeamForm
                            action={joinTeam}
                            autocompletion={autocompletion}
                            fetchAutocompletion={fetchAutocompletion}
                        />}
                        {adding && <CreateTeamForm action={createTeam}/>}
                    </Col>
                    <Col xsHidden smHidden md={3}>
                        <EventFeed/>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamList)
