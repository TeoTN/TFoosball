import React from 'react';
import { signIn, signOut } from '../auth.actions';
import { selectTeam } from '../teams/teams.actions';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignInButton from './SignInButton';
import { connect } from 'react-redux';
import HeaderDropdown from './HeaderDropdown';
import Notifications from './Notifications';
import { loadTeamState } from '../../persistence';

const mapStateToProps = ({auth, teams}) => ({auth, teams});
const mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
    signOut: () => dispatch(signOut()),
    selectTeam: (team) => dispatch(selectTeam(team)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {
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
        const { auth: {token, profile = {}}, teams, signIn, signOut, selectTeam } = this.props;
        const currentTeam = loadTeamState();
        return (
            <div>
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
                                    selectTeam={selectTeam}
                                    currentTeam={currentTeam}
                                /> :
                                <SignInButton signIn={signIn} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Notifications />
            </div>
        );
    }
}
