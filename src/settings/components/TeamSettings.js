import React from 'react';
import { Panel} from 'react-bootstrap';
import PendingMemberList from './PendingMemberList';

class TeamSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { pendingTeams, acceptMember, rejectMember, currentTeam } = this.props;
        return (
            <Panel>
                <h3>Team: {currentTeam.name}</h3>
                <h4>Pending team members</h4>
                { pendingTeams.length > 0 ?
                    <PendingMemberList
                        users={pendingTeams}
                        onAccept={acceptMember}
                        onReject={rejectMember}
                    /> :
                    <h6 className="text-muted">There are no pending team members</h6>
                }
            </Panel>
        );
    }
}

export default TeamSettings;
