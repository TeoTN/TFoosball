import React from 'react';
import { connect } from 'react-redux';
import ProfileChart from './ProfileChart';
import ProfileStats from './ProfileStats';
import { Panel, NavItem, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import md5 from 'md5';

const mapStateToProps = ({profile}) => ({profile});

@withRouter
@connect(mapStateToProps, null)
export default class ProfileLayout extends React.Component {
    render() {
        const { children, profile, params: {username}} = this.props;
        const avatarURL = !profile.email ? '' : `https://www.gravatar.com/avatar/${md5(profile.email )}`;

        return (
            <div className="container">
                <h1>
                    <picture className="profile-photo">
                        <img src={avatarURL} type="image/jpeg" alt="avatar" />
                    </picture>
                    { username } <small>{ profile.exp } XP</small>
                </h1>
                <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
                    <LinkContainer to={{ pathname: `/profile/${username}/stats`}}>
                        <NavItem eventKey="1" href="#">Statistics</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: `/profile/${username}/matches`}}>
                        <NavItem eventKey="2" href="#">Matches played</NavItem>
                    </LinkContainer>
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