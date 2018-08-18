import React from 'react';
import {signIn, signOut} from '../../auth/auth.actions';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import SignInButton from '../../auth/components/SignInButton';
import {connect} from 'react-redux';
import Notifications from './Notifications';
import Navigation from './Navigation';
import { raiseError } from "../notifier.actions";


const mapStateToProps = ({auth: {profile, token}}) => ({
    username: profile && profile.hasOwnProperty('username') ? profile.username : '',
    isAuthenticated: !!token,
});

const mapDispatchToProps = dispatch => ({
    signIn: (authData) => dispatch(signIn(authData)),
    signOut: () => dispatch(signOut()),
    loginFailure: () => dispatch(raiseError('Failed to sign in. Please try again.')),
});

class Header extends React.PureComponent {
    render() {
        const {signIn, signOut, loginFailure} = this.props;
        const {username, isAuthenticated} = this.props;
        return (
            <div>
                <Navbar staticTop collapseOnSelect defaultExpanded={false}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" className="brand-text">
                                <div className="brand-icon" style={{verticalAlign: 'middle'}} />Foosball
                            </a>
                        </Navbar.Brand>
                        { isAuthenticated ? <Navbar.Toggle /> : null }
                    </Navbar.Header>
                    <Navbar.Collapse>
                        { username && <Navigation username={username}/> }
                        <div className="pull-right">
                            { username && <Navbar.Text className="hidden-xs hidden-sm">{username}</Navbar.Text> }
                            <Nav>
                                {
                                    isAuthenticated ?
                                        <NavItem eventKey={1} onClick={signOut}>Sign out</NavItem> :
                                        <SignInButton onSuccess={signIn} onFailure={loginFailure}/>
                                }
                            </Nav>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
                <Notifications />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
