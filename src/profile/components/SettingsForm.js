import React from 'react'
import { Form, FormGroup, Row, Col, Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { ValidatedInput } from '../../shared/components/ValidatedInput';
import { isUsername, isName } from '../../validators';


const SettingsForm = ({ handleSubmit, pristine }) => {
    return (
        <Row>
            <Col xs={12} sm={8}>
                <Form onSubmit={handleSubmit} horizontal>
                    <Field component={ValidatedInput} label="Username" name="username" validate={isUsername} smLabel={3} />
                    <Field component={ValidatedInput} label="First name" name="first_name" validate={isName} smLabel={3} />
                    <Field component={ValidatedInput} label="Last name" name="last_name" validate={isName} smLabel={3} />
                    <FormGroup>
                        <Col smOffset={3} sm={9}>
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
