import React from 'react'
import { ListGroup } from 'react-bootstrap';
import TeamItem from './TeamItem';


const TeamList = ({teams, onTeamSelect, selectedTeam}) => {
    return (
        <ListGroup>
            {
                teams.map((team, idx) =>
                    <TeamItem
                        key={idx}
                        team={team}
                        onSelect={() => onTeamSelect(team)}
                        selected={selectedTeam === team.id}
                    />
                )
            }
        </ListGroup>
    );
};

export default TeamList;
