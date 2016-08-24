import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Header extends Component {
    render() {
        return (
            <Navbar staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">TFoosball</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to={{ pathname: '/'}}>
                        <NavItem eventKey={1} href="#">New match</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: '/profile/1'}}>
                        <NavItem eventKey={2} href="#">Profile</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: '/ranking'}}>
                        <NavItem eventKey={3} href="#">Ranking</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        );
    }
}