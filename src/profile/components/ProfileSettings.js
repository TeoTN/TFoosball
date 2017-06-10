import React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import SettingsForm from './SettingsForm';
import { requestSaveSettings } from '../../settings/settings.actions';


const mapStateToProps = ({ auth: {profile} }) => ({profile});
const mapDispatchToProps = (dispatch) => ({
    saveSettings: (initialValues, values) => dispatch(requestSaveSettings(initialValues, values)),
});

@connect(mapStateToProps, mapDispatchToProps)
class ProfileSettings extends React.Component {
    onSubmit = (initialValues) => (values) => this.props.saveSettings(initialValues, values);

    render() {
        const { profile: { username, first_name, last_name }} = this.props;
        const initialValues = { username, first_name, last_name, };
        return (
            <Panel>
                <SettingsForm
                    onSubmit={this.onSubmit(initialValues)}
                    initialValues={initialValues}
                />
            </Panel>
        );
    }
}

export default ProfileSettings;
