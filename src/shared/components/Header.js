import React from 'react';
import { signIn, signOut } from '../auth.actions';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignInButton from './SignInButton';
import { connect } from 'react-redux';
import HeaderDropdown from './HeaderDropdown';
import { saveTeamState } from '../../persistence';

const mapStateToProps = ({auth}) => ({auth});
const mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
    signOut: () => dispatch(signOut()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {
    selectTeam(team) {
        saveTeamState(team);
        window.location = '/match';
    }

    renderNavigation(username) {
        return (
            <Nav>
                <LinkContainer to={{ pathname: `/match`}}>
                    <NavItem eventKey={1} href="#">New match</NavItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: `/profile/${username}/stats`}}>
                    <NavItem eventKey={2} href="#">My profile</NavItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: `/ranking`}}>
                    <NavItem eventKey={3} href="#">Ranking</NavItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: `/matches/1`}}>
                    <NavItem eventKey={4} href="#">Matches</NavItem>
                </LinkContainer>
            </Nav>
        );
    }

    render() {
        const { auth: {token, teams, profile = {}}, signIn, signOut } = this.props;
        return (
            <Navbar staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">TFoosball</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    { profile.hasOwnProperty('username') ? this.renderNavigation(profile.username) : null }
                    <Nav pullRight>
                        {
                            token && profile.hasOwnProperty('username') ?
                                <HeaderDropdown
                                    signOut={signOut}
                                    profile={profile}
                                    teams={teams}
                                    selectTeam={this.selectTeam} /> :
                                <SignInButton signIn={signIn} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
