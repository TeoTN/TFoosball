import React from 'react';
import {signIn, signOut} from '../auth/auth.actions';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import SignInButton from './SignInButton';
import {connect} from 'react-redux';
import Notifications from './Notifications';
import Navigation from './Navigation';


const mapStateToProps = ({auth: {profile, token}}) => ({
    username: profile && profile.hasOwnProperty('username') ? profile.username : '',
    isAuthenticated: !!token,
});
const mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
    signOut: () => dispatch(signOut()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {
    render() {
        const {signIn, signOut} = this.props;
        const {username, isAuthenticated} = this.props;
        return (
            <div>
                <Navbar staticTop collapseOnSelect defaultExpanded={false}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" style={{verticalAlign: 'middle'}}><div className="brand-icon" />&nbsp;TFoosball</a>
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
                                        <SignInButton signIn={signIn}/>
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
