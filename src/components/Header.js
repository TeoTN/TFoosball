import React from 'react';
import { signIn, signOut } from '../actions/auth.actions';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignInButton from './SignInButton';
import { connect } from 'react-redux';

const mapStateToProps = ({auth}) => ({auth});
const mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
    signOut: () => dispatch(signOut()),
});

const navigation = (username) => (
    <Nav>
        <LinkContainer to={{ pathname: '/match'}}>
            <NavItem eventKey={1} href="#">New match</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: `/profile/${username}/stats`}}>
            <NavItem eventKey={2} href="#">My profile</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/ranking'}}>
            <NavItem eventKey={3} href="#">Ranking</NavItem>
        </LinkContainer>
        {/*<LinkContainer to={{ pathname: '/tournament/0'}}>*/}
            {/*<NavItem eventKey={5} href="#">Tournament</NavItem>*/}
        {/*</LinkContainer>*/}
    </Nav>
);

const Header = ({ auth: { token, profile, }, signIn, signOut }) => (
    <Navbar staticTop>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">TFoosball</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            { profile && profile.hasOwnProperty('username') ? navigation(profile.username) : null }
            <Nav pullRight>
                {
                    token && profile ?
                <NavDropdown eventKey={5} title={profile.username} id="account-dropdown">
                    <MenuItem eventKey={5.1}>Settings</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={5.2} onClick={signOut}>Sign out</MenuItem>
                </NavDropdown> :
                <SignInButton signIn={signIn} />
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);