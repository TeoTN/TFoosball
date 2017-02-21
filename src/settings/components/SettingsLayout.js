import React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Button, Row, Col, Well } from 'react-bootstrap';
import { requestSaveMember, requestSaveProfile } from '../settings.actions';
import InputField from './InputField';
import { getSelectedTeam } from '../../shared/teams/teams.reducer';

const mapStateToProps = ({auth: {profile}, teams}) => ({profile, teams});
const mapDispatchToProps = (dispatch) => ({
    saveMember: (data) => dispatch(requestSaveMember(data)),
    saveProfile: (data) => dispatch(requestSaveProfile(data)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsLayout extends React.Component {
    constructor(props) {
        super(props);
        const { profile: {first_name, last_name, username}, teams } = this.props;
        const currentTeam = getSelectedTeam(teams);
        this.state = {
            username,
            first_name,
            last_name,
            currentTeam,
        };
    }

    handleChange = (fieldName) => (event) => {
        this.setState({ [fieldName]: event.target.value });
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
        const { currentTeam, username, first_name, last_name } = this.state;
        return (
            <div className="container">
                <h1>
                    Settings&nbsp;
                </h1>
                <Row>
                <Col sm={8}>
                    <Well>
                        <Form onSubmit={this.saveMember} horizontal>
                            <fieldset>
                                <legend>
                                    Team member <small>(<em>{ currentTeam ? currentTeam.name : ''}</em>)</small>
                                </legend>
                                <InputField
                                    name="username"
                                    label="Username"
                                    onChange={this.handleChange}
                                    value={username}
                                />
                                <FormGroup>
                                    <Col smOffset={3} sm={8}>
                                        <Button type="submit" bsStyle="success" block>
                                            Save
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </fieldset>
                        </Form>
                        <Form onSubmit={this.saveProfile} horizontal>
                            <fieldset>
                                <legend>Profile data</legend>
                                <InputField
                                    name="first_name"
                                    label="First name"
                                    onChange={this.handleChange}
                                    value={first_name}
                                />
                                <InputField
                                    name="last_name"
                                    label="Last name"
                                    onChange={this.handleChange}
                                    value={last_name}
                                />
                                <FormGroup>
                                    <Col smOffset={3} sm={8}>
                                        <Button type="submit" bsStyle="success" block>
                                            Save
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </fieldset>
                        </Form>
                    </Well>
                </Col>
                </Row>
                {this.props.children}
            </div>
        );
    }
}
