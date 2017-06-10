import React from 'react';
import {Panel, Row, Col} from 'react-bootstrap';
import ProfileSettingsForm from './ProfileSettingsForm';

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props);
        const {profile: {first_name, last_name, username}} = this.props;

        this.state = {
            username,
            first_name,
            last_name,
        };
    }

    handleChange = (fieldName) => (event) => {
        this.setState({[fieldName]: event.target.value});
    };

    saveProfile = (event) => {
        event.preventDefault();
        const profileData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
        };
        const memberData = {
            username: this.state.username,
        };
        this.props.saveProfile(profileData);
        this.props.saveMember(memberData);
    };


    render() {
        const { username, first_name, last_name } = this.state;

        return (
            <Panel>
                <Row>
                    <Col md={8} xs={12}>
                        <h4 className="text-info">Personal data</h4>
                        <ProfileSettingsForm
                            saveProfile={this.saveProfile}
                            handleChange={this.handleChange}
                            first_name={first_name}
                            last_name={last_name}
                            username={username}
                        />
                    </Col>
                </Row>
            </Panel>
        );
    }
}

export default ProfileSettings;
