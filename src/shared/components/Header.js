import React from 'react';
import { signIn, signOut } from '../auth/auth.actions';
import { selectTeam } from '../teams/teams.actions';
import { getSelectedTeam } from '../teams/teams.reducer';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SignInButton from './SignInButton';
import { connect } from 'react-redux';
import HeaderDropdown from './HeaderDropdown';
import Notifications from './Notifications';

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
        const { auth: {token, profile}, teams, signIn, signOut, selectTeam } = this.props;
        const currentTeam = getSelectedTeam(teams);
        const username = profile && profile.hasOwnProperty('username') ? profile.username : '';
        return (
            <div>
            <Navbar staticTop collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">TFoosball</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    { username ? this.renderNavigation(username) : null }
                    <Nav pullRight>
                        {
                            token && username ?
                                <HeaderDropdown
                                    signOut={signOut}
                                    username={username}
                                    teams={teams.joined}
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
