import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, Col, Button, ControlLabel } from 'react-bootstrap';
import { StaticValidatedInput } from "../../shared/components/ValidatedInput";
import { connect } from "react-redux";
import { getUsers } from "../../users/users.reducer";
import { grantSuperpowers } from "../teams.actions";

const mapStateToProps = state => ({
    users: getUsers(state),
});
const mapDispatchToProps = dispatch => ({
    grantSuperpowers: ({username: {value}}) => dispatch(grantSuperpowers(value)),
});

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({form: 'adminGrant'})
class TeamAdmin extends React.PureComponent {
    getOptions = () => Object
        .values(this.props.users)
        .filter(user => !user.is_team_admin)
        .map(user => ({value: user.username, label: user.username}));

    render() {
        const {handleSubmit, grantSuperpowers} = this.props;
        return (
            <div>
                <h4 className='text-info'>Grant superpowers</h4>
                <Form onSubmit={handleSubmit(grantSuperpowers)} horizontal>
                    <Col sm={2}>
                        <ControlLabel>Username</ControlLabel>
                    </Col>
                    <Col sm={8}>
                        <Field
                            name='username'
                            label="Username"
                            component={StaticValidatedInput}
                            options={this.getOptions()}
                            onInputChange={() => {
                            }}
                            placeholder="Member username"
                            promptTextCreator={label => `Grant superpowers to ${label}`}
                        />
                    </Col>
                    <FormGroup>
                        <Col sm={2}>
                            <Button type="submit" bsStyle='success' block>
                                Grant
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <hr/>
            </div>
        );
    }
}

export default TeamAdmin;
