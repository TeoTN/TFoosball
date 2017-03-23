import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Tab, NavItem, Nav} from 'react-bootstrap';
import {requestSaveMember, requestSaveProfile} from '../settings.actions';
import { memberAcceptance } from '../../shared/teams/teams.actions';
import ProfileSettings from './ProfileSettings';
import TeamSettings from './TeamSettings';
import {getSelectedTeam} from '../../shared/teams/teams.reducer';

const mapStateToProps = ({auth: {profile}, teams}) => ({
    profile,
    currentTeam: getSelectedTeam(teams),
    pendingTeams: teams.pending,
});
const mapDispatchToProps = (dispatch) => ({
    saveMember: (data) => dispatch(requestSaveMember(data)),
    saveProfile: (data) => dispatch(requestSaveProfile(data)),
    acceptMember: (id) => dispatch(memberAcceptance(id, true)),
    rejectMember: (id) => dispatch(memberAcceptance(id, false)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsLayout extends React.Component {
    render() {
        const {
            pendingTeams,
            currentTeam,
            profile,
            rejectMember,
            acceptMember,
            saveProfile,
            saveMember
        } = this.props;
        return (
            <div className="container">
                <h1>
                    Settings&nbsp;
                </h1>
                <Tab.Container id="tabs-with-dropdown" defaultActiveKey="profile">
                    <Row className="clearfix">
                        <Col sm={12}>
                            <Nav bsStyle="tabs">
                                <NavItem eventKey="profile">Profile</NavItem>
                                <NavItem eventKey="team">Team</NavItem>
                            </Nav>
                        </Col>
                        <Col sm={12}>
                            <Tab.Content animation>
                                <Tab.Pane eventKey="profile">
                                    <ProfileSettings
                                        profile={profile}
                                        saveProfile={saveProfile}
                                        saveMember={saveMember}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="team">
                                    <TeamSettings
                                        pendingTeams={pendingTeams}
                                        rejectMember={rejectMember}
                                        acceptMember={acceptMember}
                                        currentTeam={currentTeam}
                                    />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

                {this.props.children}
            </div>
        );
    }
}
