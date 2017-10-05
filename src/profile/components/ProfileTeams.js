import React from 'react';
import { connect } from 'react-redux';
import { Panel, Label, Row } from 'react-bootstrap';
import { TeamList, PendingMemberList, TeamInvite } from '../../teams/components/';
import { selectTeam, leaveTeam, memberAcceptance } from '../../teams/teams.actions';
import { getSelectedTeam } from '../../teams/teams.reducer';
import { showQuestionModal } from '../../shared/modal.actions';
import Switch from '../../shared/components/Switch';
import { fetchEmailAutocompletion, inviteUser } from '../../users/user.actions';
import {FS_INVITATIONS} from "../../api/config";


const mapStateToProps = ({teams, usersAutocompletion: {emailAutocompletion, loadingEmailAutocompletion}}) => ({
    teams,
    emailAutocompletion,
    loadingEmailAutocompletion,
});
const mapDispatchToProps = (dispatch) => ({
    selectTeam: (team) => dispatch(selectTeam(team)),
    leaveTeam: (team) => dispatch(leaveTeam(team)),
    acceptMember: (id) => dispatch(memberAcceptance(id, true)),
    rejectMember: (id) => dispatch(memberAcceptance(id, false)),
    showModal: (modalParams) => dispatch(showQuestionModal(modalParams)),
    fetchEmailAutocompletion: (input) => dispatch(fetchEmailAutocompletion(input)),
    submitInvitation: ({email}) => dispatch(inviteUser(email.value)),
});

@connect(mapStateToProps, mapDispatchToProps)
class ProfileTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            joinMode: false,
        };
    }

    toggleMode = (mode) => ({target: {checked}}) => { this.setState({[mode]: checked})};

    onTeamSelect = (team) => {
        const {selectTeam, leaveTeam, showModal} = this.props;
        if (this.state.editMode) {
            showModal({
                title: 'Are you sure?',
                text: `You are about to leave team ${team.name}. Proceed?`,
                onAccept: () => leaveTeam(team),
                onReject: () => {},
            });
        } else {
            selectTeam(team);
        }
    };

    render() {
        const {
            teams,
            acceptMember,
            rejectMember,
            fetchEmailAutocompletion,
            emailAutocompletion,
            loadingEmailAutocompletion,
            submitInvitation,
        } = this.props;
        const selectedTeam = getSelectedTeam(teams).name;
        return (
            <Panel>
                <h4 className="text-info">Current team</h4>
                <span className="h2">
                    <Label bsStyle="primary">
                        {selectedTeam}
                    </Label>
                </span>
                <hr />

                <h4 className="text-info">
                    Joined teams
                </h4>
                <Row className="with-vertical-margin">
                    <Switch bsStyle="success" onChange={this.toggleMode('joinMode')}>Join team mode</Switch>
                    <Switch bsStyle="danger" onChange={this.toggleMode('editMode')}>Leave team mode</Switch>
                </Row>
                <TeamList
                    teams={teams.joined}
                    selectedTeam={teams.selected}
                    onTeamSelect={this.onTeamSelect}
                    editable={this.state.editMode}
                    joinable={this.state.joinMode}
                    className="with-vertical-margin"
                />
                <hr />

                <h4 className="text-info">Pending team members</h4>
                { teams.pending.length > 0 ?
                    <PendingMemberList
                        users={teams.pending}
                        onAccept={acceptMember}
                        onReject={rejectMember}
                    /> :
                    <h6 className="text-muted">There are no pending team members</h6>
                }
                <hr />

                { FS_INVITATIONS ? <h4 className="text-info">Invite player to {selectedTeam}</h4> : null }
                { FS_INVITATIONS ? <TeamInvite
                    fetchEmailAutocompletion={fetchEmailAutocompletion}
                    loadingEmailAutocompletion={loadingEmailAutocompletion}
                    emailAutocompletion={emailAutocompletion}
                    submitInvitation={submitInvitation}
                /> : null }
            </Panel>
        );
    }
}

export default ProfileTeams;
