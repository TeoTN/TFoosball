import React from 'react'
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = ({ username }) => {
    return (
        <Nav>
            <LinkContainer to={{ pathname: `/match`}}>
                <NavItem eventKey={1} href="#">New match</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: `/profile/${username}/stats`}}>
                <NavItem eventKey={2} href="#">My profile</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: `/clubs/joined`}}>
                <NavItem eventKey={3} href="#">Clubs</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: `/ranking`}}>
                <NavItem eventKey={4} href="#">Ranking</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: `/matches/1`}}>
                <NavItem eventKey={5} href="#">Matches</NavItem>
            </LinkContainer>
        </Nav>
    );
};

export default Navigation;
