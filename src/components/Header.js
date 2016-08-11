import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

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
                    <NavItem eventKey={1} href="#">New match</NavItem>
                    <NavItem eventKey={2} href="#">Profile</NavItem>
                    <NavItem eventKey={3} href="#">Ranking</NavItem>
                </Nav>
            </Navbar>
        );
    }
}