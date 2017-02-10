import React from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const HeaderDropdown = ({ teams, profile, signOut, selectTeam }) => (
    <NavDropdown eventKey={5} title={profile.username} id="account-dropdown">
        <MenuItem disabled><span className="h6">TEAMS</span></MenuItem>
        {
            teams.length > 0 ?
                teams.map(team =>
                    <MenuItem key={team.domain} onClick={() => selectTeam(team)}>{team.name}</MenuItem>
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
