import React from 'react';
import { connect } from 'react-redux';
import { Panel, Label } from 'react-bootstrap';
import { TeamList, PendingMemberList } from '../../teams/components/';
import { selectTeam, memberAcceptance } from '../../teams/teams.actions';
import { getSelectedTeam } from '../../teams/teams.reducer';


const mapStateToProps = ({teams}) => ({ teams });
const mapDispatchToProps = (dispatch) => ({
    selectTeam: (team) => dispatch(selectTeam(team)),
    acceptMember: (id) => dispatch(memberAcceptance(id, true)),
    rejectMember: (id) => dispatch(memberAcceptance(id, false)),
});

@connect(mapStateToProps, mapDispatchToProps)
class ProfileTeams extends React.Component {
    render() {
        const {teams, selectTeam, acceptMember, rejectMember} = this.props;
        return (
            <Panel>
                <h4 className="text-info">Current team</h4>
                <span className="h2">
                    <Label bsStyle="primary">
                        {getSelectedTeam(teams).name}
                        </Label>
                </span>
                <hr />

                <h4 className="text-info">Pick current team</h4>
                <TeamList
                    teams={teams.joined}
                    selectedTeam={teams.selected}
                    onTeamSelect={selectTeam}
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
            </Panel>
        );
    }
}

export default ProfileTeams;
