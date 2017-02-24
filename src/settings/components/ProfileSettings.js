import React from 'react'
import InputField from './InputField';
import { Form, FormGroup, Button, Col } from 'react-bootstrap';

const ProfileSettings = ({saveProfile, first_name, last_name, handleChange}) => {
    return (
        <Form onSubmit={saveProfile} horizontal>
            <fieldset>
                <legend>Profile data</legend>
                <InputField
                    name="first_name"
                    label="First name"
                    onChange={handleChange}
                    value={first_name}
                />
                <InputField
                    name="last_name"
                    label="Last name"
                    onChange={handleChange}
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
    );
};

export default ProfileSettings;
