import React from 'react';
import { signIn, signOut } from '../auth/auth.actions';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SignInButton from './SignInButton';
import { connect } from 'react-redux';
import Notifications from './Notifications';
import Navigation from './Navigation';


const mapStateToProps = ({auth: {profile, token}}) => ({
    username: profile && profile.hasOwnProperty('username') ? profile.username : '',
    email: profile && profile.hasOwnProperty('email') ? profile.email: '',
    isAuthenticated: !!token,
});
const mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
    signOut: () => dispatch(signOut()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {
    render() {
        const { signIn, signOut } = this.props;
        const { username, email, isAuthenticated } = this.props;
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
                        { username ?
                            <Navbar.Text className="hidden-xs hidden-sm">
                                {username}
                            </Navbar.Text> :
                            null }
                        {
                            isAuthenticated ?
                                <NavItem eventKey={1} onClick={signOut}>Sign out</NavItem> :
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
