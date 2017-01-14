import React from 'react';
import { signIn, signOut } from '../actions/auth.actions';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
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
            <NavItem eventKey={2} href="#">Profile</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/ranking'}}>
            <NavItem eventKey={3} href="#">Ranking</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/tournament/0'}}>
            <NavItem eventKey={4} href="#">Tournament</NavItem>
        </LinkContainer>
    </Nav>
);

const Header = ({ auth: { token, profile, }, signIn, signOut }) => (
    <Navbar staticTop>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">TFoosball</a>
            </Navbar.Brand>
        </Navbar.Header>
        { profile && profile.hasOwnProperty('username') ? navigation(profile.username) : null }
        <Nav pullRight>
            {
                token ?
                    <SignOutButton signOut={signOut} /> :
                    <SignInButton signIn={signIn} />
            }
        </Nav>
        { profile ?
            <Navbar.Text pullRight>
                { profile.first_name } {profile.last_name} <i>{ profile.username }</i>&nbsp;
            </Navbar.Text>
            : null
        }
    </Navbar>
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);