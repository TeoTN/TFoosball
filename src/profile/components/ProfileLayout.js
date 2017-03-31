import React from 'react';
import { connect } from 'react-redux';
import ProfileChart from './ProfileChart';
import ProfileStats from './ProfileStats';
import ProfileTeams from './ProfileTeams';
import { Panel, NavItem, Nav, Glyphicon } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';
import md5 from 'md5';

const mapStateToProps = ({profile, auth}) => ({
    profile,
    myUsername: auth.profile.username,
});

@withRouter
@connect(mapStateToProps, null)
export default class ProfileLayout extends React.Component {
    render() {
        const { children, profile, params: {username}, myUsername} = this.props;
        const avatarURL = !profile.email ? '' : `https://www.gravatar.com/avatar/${md5(profile.email )}`;

        return (
            <div className="container">
                <h1>
                    <picture className="profile-photo">
                        <img src={avatarURL} type="image/jpeg" alt="avatar" />
                    </picture>
                    { username } <small>{ profile.exp } XP</small>
                </h1>
                <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect} className="text-center">
                    <LinkContainer to={{pathname: `/profile/${username}/stats`}}>
                        <NavItem eventKey="1" href="#">
                            <Glyphicon glyph="dashboard"/><br/>Statistics
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to={{pathname: `/profile/${username}/matches`}}>
                        <NavItem eventKey="2" href="#">
                            <Glyphicon glyph="list"/><br/>Matches
                        </NavItem>
                    </LinkContainer>
                    { myUsername === username ?
                        <LinkContainer to={{pathname: `/profile/${username}/teams`}}>
                            <NavItem eventKey="3" href="#">
                                <FontAwesome name="users"/><br/>Teams
                            </NavItem>
                        </LinkContainer> :
                        null }
                    { myUsername === username ?
                        <LinkContainer to={{pathname: `/profile/${username}/settings`}}>
                            <NavItem eventKey="4" href="#">
                                <Glyphicon glyph="wrench"/><br/>Settings
                            </NavItem>
                        </LinkContainer> : null }
                </Nav>
                { children ?
                    children :
                    <Panel>
                        <ProfileStats profile={profile}/>
                        <ProfileChart profile={profile}/>
                    </Panel>
                }
            </div>
        );
    }
}