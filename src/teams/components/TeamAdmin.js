import React from 'react';
import { connect } from "react-redux";
import { reduxForm, Field } from 'redux-form';
import { browserHistory } from 'react-router';
import { Form, FormGroup, Col, Button, ControlLabel } from 'react-bootstrap';
import { StaticValidatedInput } from "../../shared/components/ValidatedInput";
import { getAllUsers } from "../../users/users.reducer";
import { manageUser } from "../teams.actions";
import ManageMember from "./ManageMember";
import {GlyphButton, PanelHeader} from "../../shared/components";


const mapStateToProps = state => ({
    users: getAllUsers(state),
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

    goBack = () => {
        browserHistory.push('/clubs/admin/');
    };

    render() {
        const {handleSubmit, manageUser, params: {username}, profile} = this.props;
        return (
            <React.Fragment>
                <PanelHeader
                    title={username ? `Manage member ${username}` : 'Manage member'}
                    glyph="superpowers"
                    isAwesome>
                    { username && <GlyphButton onClick={this.goBack} bsSize="small" glyph="chevron-left" bsStyle="success">
                        Back to user picker
                    </GlyphButton> }
                </PanelHeader>
                {
                    username ?
                        <ManageMember
                            manageUser={manageUser}
                            initialValues={profile}
                        /> :
                        <Form onSubmit={handleSubmit(this.goToUser)} horizontal>
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
                                <Col xs={12} sm={2}>
                                    <Button type="submit" bsStyle='success' block>
                                        Manage
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                }
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'username'})(TeamAdmin));
