import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import { connect } from 'react-redux';

const mapStateToProps = ({auth, profile}) => ({
    auth,
    profile
});

const navigation = (username) => (
    <Nav>
        <LinkContainer to={{ pathname: '/match'}}>
            <NavItem eventKey={1} href="#">New match</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: `/profile/${username}`}}>
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

const Header = (props) => {
    const { profile, auth } = props;
    return (
        <Navbar staticTop>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">TFoosball</a>
                </Navbar.Brand>
            </Navbar.Header>
            { profile.username ? navigation(profile.username) : null }
            <Nav pullRight>
                {
                    auth.hasOwnProperty('token') ?
                        <SignOutButton /> :
                        <SignInButton />
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
};

export default connect(mapStateToProps, null)(Header);