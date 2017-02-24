import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Well} from 'react-bootstrap';
import {requestSaveMember, requestSaveProfile} from '../settings.actions';
import {getSelectedTeam} from '../../shared/teams/teams.reducer';
import { memberAcceptance } from '../../shared/teams/teams.actions';
import MemberSettings from './MemberSettings';
import ProfileSettings from './ProfileSettings';
import PendingMemberList from './PendingMemberList';

const mapStateToProps = ({auth: {profile}, teams}) => ({profile, teams});
const mapDispatchToProps = (dispatch) => ({
    saveMember: (data) => dispatch(requestSaveMember(data)),
    saveProfile: (data) => dispatch(requestSaveProfile(data)),
    acceptMember: (id) => dispatch(memberAcceptance(id, true)),
    rejectMember: (id) => dispatch(memberAcceptance(id, false)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsLayout extends React.Component {
    constructor(props) {
        super(props);
        const {profile: {first_name, last_name, username}, teams} = this.props;
        const currentTeam = getSelectedTeam(teams);
        this.state = {
            username,
            first_name,
            last_name,
            currentTeam,
        };
    }

    handleChange = (fieldName) => (event) => {
        this.setState({[fieldName]: event.target.value});
    };

    saveMember = (event) => {
        event.preventDefault();
        const data = {
            username: this.state.username
        };
        this.props.saveMember(data);
    };

    saveProfile = (event) => {
        event.preventDefault();
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
        };
        this.props.saveProfile(data);
    };

    render() {
        const {currentTeam, username, first_name, last_name} = this.state;
        const {teams: {pending}, rejectMember, acceptMember} = this.props;
        return (
            <div className="container">
                <h1>
                    Settings&nbsp;
                </h1>
                <Row>
                    <Col md={8} xs={12}>
                        <Well>
                            <ProfileSettings
                                saveProfile={this.saveProfile}
                                handleChange={this.handleChange}
                                first_name={first_name}
                                last_name={last_name}
                            />
                        </Well>
                    </Col>
                    <Col md={8} xs={12}>
                        <Well>
                            <h2>
                                Team membership <small>(<em>{ currentTeam ? currentTeam.name : ''}</em>)</small>
                            </h2>
                            <MemberSettings
                                saveMember={this.saveMember}
                                handleChange={this.handleChange}
                                username={username}
                            />
                            <PendingMemberList
                                users={pending}
                                onAccept={acceptMember}
                                onReject={rejectMember}
                            />
                        </Well>
                    </Col>
                </Row>
                {this.props.children}
            </div>
        );
    }
}
