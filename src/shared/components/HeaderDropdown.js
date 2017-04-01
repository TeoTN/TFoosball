import React from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const HeaderDropdown = ({ username, signOut}) => (
    <NavDropdown eventKey={5} title={username} id="account-dropdown">
        <LinkContainer to={{ pathname: `/settings`}}>
            <MenuItem eventKey={5.1}>Settings</MenuItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={5.2} onClick={signOut}>Sign out</MenuItem>
    </NavDropdown>
);

export default HeaderDropdown;
