import React from 'react';
import { connect } from 'react-redux';
import {
    Form,
    FormGroup,
    Button,
    Row,
    Col,
    Well,
} from 'react-bootstrap';
import * as actions from '../../profile/profile.actions';
import { raiseError } from '../../shared/error.actions';
import { updateProfile } from '../../api/connectors';
import { displayInfo } from '../../shared/infobar.actions';
import InputField from './InputField';


const mapStateToProps = ({auth: {profile}}) => ({profile,});
const mapDispatchToProps = (dispatch) => ({
    update: (userNewData) => dispatch(actions.profileUpdate(userNewData)),
    displayInfo: (msg) => dispatch(displayInfo(msg)),
    raiseError: (msg) => dispatch(raiseError(msg)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsLayout extends React.Component {
    constructor(props) {
        super(props);
        const { username, first_name, last_name } = this.props.profile;
        this.state = {
            username,
            first_name,
            last_name,
        };
    }

    handleChange = (fieldName) => (event) => {
        this.setState({ [fieldName]: event.target.value });
    };

    save = (event) => {
        event.preventDefault();
        const { update, raiseError, displayInfo } = this.props;
        const { first_name, last_name, username } = this.state;

        if (username.length < 3) {
            raiseError('Username must consist of at least 3 characters.');
            return;
        }

        const data = {
            username,
            first_name,
            last_name,
        };

        updateProfile(data)
            .then(update)
            .then(() => displayInfo('Profile changes saved'))
            .catch(raiseError)
    };

    render() {
        return (
            <div>
                <h1>
                    Settings&nbsp;
                </h1>
                <Row>
                <Col sm={8}>
                    <Well>
                        <Form onSubmit={this.save} horizontal>
                            <fieldset>
                                <legend>Profile data</legend>
                                <InputField
                                    name="username"
                                    label="Username"
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                />
                                <InputField
                                    name="first_name"
                                    label="First name"
                                    onChange={this.handleChange}
                                    value={this.state.first_name}
                                />
                                <InputField
                                    name="last_name"
                                    label="Last name"
                                    onChange={this.handleChange}
                                    value={this.state.last_name}
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
