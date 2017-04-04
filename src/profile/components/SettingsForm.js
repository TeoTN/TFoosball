import React from 'react'
import { Form, FormGroup, Row, Col, Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import SettingsInput from './SettingsInput';
import { isUsername, isName } from '../../validators';


const SettingsForm = ({ handleSubmit, pristine }) => {
    return (
        <Row>
            <Col xs={12} sm={8}>
                <h4>Profile settings</h4>
                <Form onSubmit={handleSubmit} horizontal>
                    <Field component={SettingsInput} label="Username" name="username" validate={isUsername} />
                    <Field component={SettingsInput} label="First name" name="first_name" validate={isName} />
                    <Field component={SettingsInput} label="Last name" name="last_name" validate={isName} />
                    <FormGroup>
                        <Col smOffset={3} sm={8}>
                            <Button type="submit" bsStyle={pristine ? 'default' : 'success'} block disabled={pristine}>
                                Save
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    );
};

export default reduxForm({
    form: 'profileSettings',
})(SettingsForm);
