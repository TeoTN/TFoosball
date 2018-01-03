import React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import SettingsForm from './SettingsForm';
import {requestSaveSettings, requestToggleActive} from '../../settings/settings.actions';


const mapStateToProps = ({ auth: {profile} }) => ({profile});
const mapDispatchToProps = (dispatch) => ({
    saveSettings: (initialValues, values) => dispatch(requestSaveSettings(initialValues, values)),
    toggleActive: (value) => dispatch(requestToggleActive(value)),
});

class ProfileSettings extends React.PureComponent {
    onSubmit = (initialValues) => (values) => this.props.saveSettings(initialValues, values);

    render() {
        const { profile: { username, first_name, last_name, hidden }, toggleActive} = this.props;
        const initialValues = { username, first_name, last_name, hidden };
        return (
            <Panel>
                <SettingsForm
                    onSubmit={this.onSubmit(initialValues)}
                    onToggleActive={toggleActive}
                    initialValues={initialValues}
                />
            </Panel>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
