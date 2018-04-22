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
    myUsername: auth.profile ? auth.profile.username : '',
});

class ProfileLayout extends React.PureComponent {
    render() {
        const {children, profile, params: {username}, myUsername} = this.props;

        return (
            <div className="container">
                <div className="profile-head">
                    <Gravatar email={profile.email}/>
                    <h1 className='text-ellipsis'>{username}
                        <small>{profile.exp}&nbsp;XP</small>
                    </h1>
                    {
                        profile && profile.is_team_admin &&
                        <h2>
                            <Icon name='superpowers' ariaLabel={'Team admin'} className='text-danger'/> Club Admin
                        </h2>
                    }

                </div>
                <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect} className="text-center">
                    <LinkContainer to={{pathname: `/profile/${username}/stats`}}>
                        <NavItem eventKey="1" href="#">
                            <Glyphicon glyph="dashboard"/>
                            <p className="xs-text-small">Statistics</p>
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to={{pathname: `/profile/${username}/matches`}}>
                        <NavItem eventKey="2" href="#">
                            <Glyphicon glyph="list"/>
                            <p className="xs-text-small">Matches</p>
                        </NavItem>
                    </LinkContainer>
                    {myUsername === username &&
                    <LinkContainer to={{pathname: `/profile/${username}/settings`}}>
                        <NavItem eventKey="4" href="#">
                            <Glyphicon glyph="wrench"/>
                            <p className="xs-text-small">Settings</p>
                        </NavItem>
                    </LinkContainer>}
                </Nav>
                {
                    children ||
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

export default withRouter(connect(mapStateToProps, null)(ProfileLayout))
