import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, Col, Button, ControlLabel } from 'react-bootstrap';
import { StaticValidatedInput } from "../../shared/components/ValidatedInput";
import { connect } from "react-redux";
import { getUsers } from "../../users/users.reducer";
import { manageUser } from "../teams.actions";
import { browserHistory } from 'react-router';
import ManageMember from "./ManageMember";

const mapStateToProps = state => ({
    users: getUsers(state),
    profile: state.profile,
});
const mapDispatchToProps = dispatch => ({
    manageUser: (updatedProfile) => dispatch(manageUser(updatedProfile))
});

class TeamAdmin extends React.PureComponent {
    getOptions = () => Object
        .values(this.props.users)
        .map(user => ({value: user.username, label: user.username}));

    goToUser = ({username: {value}}) => {
        browserHistory.push(`/clubs/admin/${value}`);
    };

    render() {
        const {handleSubmit, manageUser, params: {username}, profile} = this.props;
        return (
            <div>
                {
                    username ?
                        <ManageMember
                            manageUser={manageUser}
                            initialValues={profile}
                        /> :
                        <Form onSubmit={handleSubmit(this.goToUser)} horizontal>
                            <h4 className='text-info'>Manage member</h4>
                            <Col sm={2}>
                                <ControlLabel>Username</ControlLabel>
                            </Col>
                            <Col sm={8}>
                                <Field
                                    name='username'
                                    label="Username"
                                    component={StaticValidatedInput}
                                    options={this.getOptions()}
                                    placeholder="Member username"
                                    promptTextCreator={label => `Manage ${label} settings`}
                                />
                            </Col>
                            <FormGroup>
                                <Col sm={2}>
                                    <Button type="submit" bsStyle='success' block>
                                        Manage
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'username'})(TeamAdmin));
