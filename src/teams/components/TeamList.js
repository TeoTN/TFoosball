import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { SelectTeamItem, JoinTeamItem } from './index';


const TeamList = ({teams, onTeamSelect, selectedTeam, editable, joinable}) => {
    return (
        <ListGroup fill>
            { joinable ? <JoinTeamItem /> : null }
            {
                teams.map((team, idx) =>
                    <SelectTeamItem
                        key={idx}
                        team={team}
                        onSelect={() => onTeamSelect(team)}
                        selected={selectedTeam === team.id}
                        editable={editable}
                    />
                )
            }
        </ListGroup>
    );
};

export default TeamList;
