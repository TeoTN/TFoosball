import React from 'react';
import { connect } from 'react-redux';
import ProfileChart from './ProfileChart';
import ProfileStats from './ProfileStats';
import { Row, Col, Panel, NavItem, Nav, Glyphicon } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Icon from 'react-fontawesome';
import Gravatar from './Gravatar';

const mapStateToProps = ({profile, auth}) => ({
    profile,
    myUsername: auth.profile.username,
});


@withRouter
@connect(mapStateToProps, null)
export default class ProfileLayout extends React.Component {
    render() {
        const { children, profile, params: {username}, myUsername} = this.props;

        return (
            <div className="container">
                <h1>
                    <Gravatar email={profile.email} />
                    { username } <small>{ profile.exp }&nbsp;XP</small>
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
                                <Icon name="users"/><br/>Teams
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
                        <Row>
                            <Col md={5}>
                                <ProfileStats profile={profile}/>
                            </Col>
                            <Col md={7}>
                                <ProfileChart profile={profile}/>
                            </Col>
                        </Row>
                    </Panel>
                }
            </div>
        );
    }
}