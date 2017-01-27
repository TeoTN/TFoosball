import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileChart from './ProfileChart';
import ProfileStats from './ProfileStats';
import { Row, Button, Panel, ButtonGroup, NavItem, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const mapStateToProps = ({profile}) => ({profile});

@withRouter
@connect(mapStateToProps, null)
export default class ProfileLayout extends Component {
    render() {
        const { children, profile, params: {username}} = this.props;
        return (
            <div>
                <h1>Profile &nbsp;<small>{ username } ({ profile.exp } XP)</small></h1>
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