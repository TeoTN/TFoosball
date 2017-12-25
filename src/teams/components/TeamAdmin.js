import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, Col, Button, ControlLabel } from 'react-bootstrap';
import { StaticValidatedInput } from "../../shared/components/ValidatedInput";

@reduxForm({form: 'adminGrant'})
class TeamAdmin extends React.PureComponent {
    getOptions = () => Object
        .values(this.props.users)
        .filter(user => !user.is_team_admin)
        .map(user => ({value: user.username, label: user.username}));

    render() {
        return (
            <div>
                <h4 className='text-info'>Grant superpowers</h4>
                <Form onSubmit={() => {}} horizontal>
                    <Col sm={2}>
                        <ControlLabel>Username</ControlLabel>
                    </Col>
                    <Col sm={8}>
                        <Field
                            name='username'
                            label="Username"
                            component={StaticValidatedInput}
                            options={this.getOptions()}
                            onInputChange={() => {}}
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
