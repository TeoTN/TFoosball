import React from 'react';
import { signIn, signOut } from '../auth/auth.actions';
import { selectTeam } from '../../teams/teams.actions';
import { getSelectedTeam } from '../../teams/teams.reducer';
import { Navbar, Nav } from 'react-bootstrap';
import SignInButton from './SignInButton';
import { connect } from 'react-redux';
import HeaderDropdown from './HeaderDropdown';
import Notifications from './Notifications';
import Navigation from './Navigation';


const mapStateToProps = ({auth: {profile, token}, teams}) => ({
    username: profile && profile.hasOwnProperty('username') ? profile.username : '',
    isAuthenticated: !!token,
    currentTeam: getSelectedTeam(teams),
    joinedTeams: teams.joined,
});
const mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
    signOut: () => dispatch(signOut()),
    selectTeam: (team) => dispatch(selectTeam(team)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {
    render() {
        const { signIn, signOut, selectTeam } = this.props;
        const { username, currentTeam, isAuthenticated, joinedTeams } = this.props;
        return (
            <div>
            <Navbar staticTop collapseOnSelect defaultExpanded={!isAuthenticated}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">TFoosball</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    { username ? <Navigation username={username} /> : null }
                    <Nav pullRight>
                        {
                            isAuthenticated && username ?
                                <HeaderDropdown
                                    signOut={signOut}
                                    username={username}
                                    teams={joinedTeams}
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
