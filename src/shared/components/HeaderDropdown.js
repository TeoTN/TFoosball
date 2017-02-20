import React from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const HeaderDropdown = ({ teams, username, signOut, selectTeam, currentTeam }) => (
    <NavDropdown eventKey={5} title={username} id="account-dropdown">
        <MenuItem header>TEAMS</MenuItem>
        {
            teams.length > 0 ?
                teams.map(team =>
                    <MenuItem
                        key={team.id}
                        onSelect={() => selectTeam(team)}
                        disabled={currentTeam.name === team.name}
                    >
                        {team.name}
                    </MenuItem>
                ) :
                null
        }
        <MenuItem divider />
        <LinkContainer to={{ pathname: `/settings`}}>
            <MenuItem eventKey={5.1}>Settings</MenuItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={5.2} onClick={signOut}>Sign out</MenuItem>
    </NavDropdown>
);

export default HeaderDropdown;
