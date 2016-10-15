import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import { loadAuthState } from '../persistence';

export default () =>
    <Navbar staticTop>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">TFoosball</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <LinkContainer to={{ pathname: '/match'}}>
                <NavItem eventKey={1} href="#">New match</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/profile/cschmidt1w'}}>
                <NavItem eventKey={2} href="#">Profile</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/ranking'}}>
                <NavItem eventKey={3} href="#">Ranking</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/tournament/0'}}>
                <NavItem eventKey={4} href="#">Tournament</NavItem>
            </LinkContainer>
        </Nav>
        <Nav pullRight>
            {
                (loadAuthState() || {}).hasOwnProperty('token') ?
                    <SignOutButton /> :
                    <SignInButton />
            }
        </Nav>
    </Navbar>