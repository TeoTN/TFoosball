import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import { loadAuthState } from '../persistence';

//TODO make it function
export default class Header extends Component {
    render() {
        const auth = loadAuthState() || {};
        return (
            <Navbar staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">TFoosball</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to={{ pathname: '/'}}>
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
                    { auth.hasOwnProperty('token') ? <SignOutButton /> : <SignInButton /> }
                </Nav>
            </Navbar>
        );
    }
}